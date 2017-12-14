// @flow

import { Player1, Player2 } from '../Constants'

import {
  isCellEmpty,
  updateCell,
  switchPlayer,
  isFinished,
  getCells,
  findMatch,
  isWinner,
} from './index'

const empty: Empty = { type: 'Empty' }
const cross: Cross = { type: 'Cross' }
const circle: Circle = { type: 'Circle' }

const emptyRow: Row = [empty, empty, empty]
const crossRow: Row = [cross, cross, cross]
const circleRow: Row = [circle, circle, circle]

const emptyBoard = [emptyRow, emptyRow, emptyRow]

const winningBoard1 = [
  [empty, circle, cross],
  [circle, empty, cross],
  [empty, circle, cross],
]

const winningBoard2 = [
  [empty, cross, circle],
  [empty, circle, cross],
  [circle, empty, cross],
]

it('Empty cells are empty', () => {
  const result = emptyBoard.every((row, index) =>
    isCellEmpty(emptyBoard, index)
  )
  expect(result).toBeTruthy()
})

it('An updated cell is not empty', () => {
  const player = Player1

  const updatedBoard = updateCell(emptyBoard, player, 0)
  const firstPosition = updatedBoard[0][0]
  expect(firstPosition.type).toBe('Cross')
})

it('Each player alternates their turn', () => {
  expect(switchPlayer(Player1)).toBe(Player2)
  expect(switchPlayer(Player2)).toBe(Player1)
  expect(switchPlayer(Player1)).toBe(Player2)
})

it('The game is finished when no empty spaces remain', () => {
  const fullBoard: BoardType = [crossRow, crossRow, crossRow]

  expect(isFinished(emptyBoard)).toBeFalsy()
  expect(isFinished(fullBoard)).toBeTruthy()
})

it('getCells returns no Nothing with a empty board', () => {
  const result = getCells([0, 1, 2], emptyBoard)
  expect(result.type).toBe('Nothing')
})

it('getCells returns a Maybe with a full board', () => {
  const fullBoard: BoardType = [crossRow, crossRow, crossRow]

  let result: Maybe<Array<CellType>> = getCells([0, 4, 8], fullBoard)

  result = ((result: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Just')
  expect(result.result.length).toBe(3)
  expect(result.result).toEqual(crossRow)
})

it('No match is found with an empty board', () => {
  const result = findMatch(getCells([0, 1, 2], emptyBoard))
  expect(result.type).toBe('Nothing')
})

it('A match is found with a winning line', () => {
  const board: BoardType = [emptyRow, emptyRow, crossRow]
  const result1 = findMatch(getCells([0, 1, 2], board))
  const result2 = findMatch(getCells([3, 4, 5], board))
  let result3 = findMatch(getCells([6, 7, 8], board))

  expect(result1.type).toBe('Nothing')
  expect(result2.type).toBe('Nothing')

  result3 = ((result3: any): Just<Array<CellType>>) // fix type warning

  expect(result3.type).toBe('Just')
  expect(result3.result).toBe(Player1)
})

it('Get cells using a diagonal line', () => {
  let cells = getCells([2, 4, 6], winningBoard2)

  cells = ((cells: any): Just<Array<CellType>>) // fix type warning
  expect(cells.type).toBe('Just')
  expect(cells.result).toEqual(circleRow)
})

it('A match is found with a diagonal line', () => {
  let result = findMatch(getCells([2, 4, 6], winningBoard2))

  result = ((result: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Just')
  expect(result.result).toBe(Player2)
})

it('A match is correctly found with a winning board', () => {
  let result = findMatch(getCells([2, 5, 8], winningBoard2))
  let result2 = findMatch(getCells([2, 4, 6], winningBoard2))

  result2 = ((result2: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Nothing')
  expect(result2.type).toBe('Just')
  expect(result2.result).toBe(Player2)
})

it('An empty board has no winner', () => {
  const result = isWinner(emptyBoard)

  expect(result.type).toBe('Nothing')
})

it('A board with a line has a winner', () => {
  let result = isWinner(winningBoard1)

  result = ((result: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Just')
  expect(result.result[0]).toBe(Player1)
})

it('A board with a vertical line has a winner', () => {
  let result = isWinner(winningBoard1)

  result = ((result: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Just')
  expect(result.result[0]).toBe(Player1)
  expect(result.result[1]).toEqual(crossRow)
})

it('A board with a diagonal line has a winner', () => {
  let result = isWinner(winningBoard2)

  result = ((result: any): Just<Array<CellType>>) // fix type warning

  expect(result.type).toBe('Just')
  expect(result.result[0]).toBe(Player2)
  expect(result.result[1]).toEqual(circleRow)
})
