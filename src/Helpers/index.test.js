// @flow

import { Player1, Player2 } from '../Constants'

import {
  isCellEmpty,
  updateCell,
  switchPlayer,
  isFinished,
  getCells,
} from './index'

const empty: Empty = { type: 'Empty' }
const cross: Cross = { type: 'Cross' }
const circle: Circle = { type: 'Circle' }

const emptyRow: Row = [empty, empty, empty]
const crossRow: Row = [cross, cross, cross]
const circleRow: Row = [circle, circle, circle]

const emptyBoard = [emptyRow, emptyRow, emptyRow]

it('Empty cells are empty', () => {
  const result = emptyBoard.every((row, index) =>
    isCellEmpty(emptyBoard, index)
  )
  expect(result).toBe(true)
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

  expect(isFinished(emptyBoard)).toBe(false)
  expect(isFinished(fullBoard)).toBe(true)
})

it('getCells returns no Nothing with a empty board', () => {
  const result = getCells([0, 1, 2], emptyBoard)
  expect(result.type).toBe('Nothing')
})

it('getCells returns a Maybe with a full board', () => {
  const fullBoard: BoardType = [crossRow, crossRow, crossRow]

  const result: Maybe<Array<CellType>> = getCells([0, 4, 8], fullBoard)
  expect(result.type).toBe('Just')
  expect(result.result.length).toBe(3)
  expect(result.result).toEqual(crossRow)
})
