// @flow

import { isCellEmpty, updateCell, switchPlayer, isFinished } from './index'

let board: BoardType

beforeEach(function() {
  const empty: Empty = { type: 'Empty' }
  const emptyRow: Row = [empty, empty, empty]
  board = [emptyRow, emptyRow, emptyRow]
})

it('Empty cells are empty', () => {
  const result = board.every((row, index) => isCellEmpty(board, index))
  expect(result).toBe(true)
})

it('An updated cell is not empty', () => {
  const player = 0

  const updatedBoard = updateCell(board, player, 0)
  const firstPosition = updatedBoard[0][0]
  expect(firstPosition.type).toBe('Cross')
})

it('Each player alternates their turn', () => {
  expect(switchPlayer(0)).toBe(1)
  expect(switchPlayer(1)).toBe(0)
  expect(switchPlayer(0)).toBe(1)
})

it('The game is finished when no empty spaces remain', () => {
  const cross: Cross = { type: 'Cross' }
  const crossRow: Row = [cross, cross, cross]
  const fullBoard: BoardType = [crossRow, crossRow, crossRow]

  expect(isFinished(board)).toBe(false)
  expect(isFinished(fullBoard)).toBe(true)
})
