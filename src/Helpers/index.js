// @flow
import { Player1, Player2 } from '../Constants'

/**
 * Business logic for the TicTacToe game
 */

// Maybe constructors
const Nothing: Object = { type: 'Nothing' }
const _Just: JustType = value => {
  return { type: 'Just', result: value }
}

type SwitchPlayer = Player => Player
export const switchPlayer: SwitchPlayer = player =>
  player === Player1 ? Player2 : Player1

type ToFlatList = (list: BoardType) => Array<CellType>
const toFlatList: ToFlatList = list =>
  list.reduce((acc, cell) => acc.concat(cell), [])

type ToBoard = (Array<CellType>) => BoardType
const toBoard: ToBoard = ([c1, c2, c3, c4, c5, c6, c7, c8, c9]) => [
  [c1, c2, c3],
  [c4, c5, c6],
  [c7, c8, c9],
]

// Assumes Player1 is 'X', and Player2 is 'O'
type UpdateCell = (BoardType, Player, BoardIndex) => BoardType
export const updateCell: UpdateCell = (board, player, index) => {
  const cells = toFlatList(board)
  const cell = cells[index]
  if (cell && cell.type === 'Empty') {
    const updatedCell: Circle | Cross =
      player === Player1 ? { type: 'Cross' } : { type: 'Circle' }
    return toBoard([
      ...cells.slice(0, index),
      updatedCell,
      ...cells.slice(index + 1),
    ])
  }
  return board
}
// Returns true when the cell at the given index in empty
type IsCellEmpty = (BoardType, number) => boolean
export const isCellEmpty: IsCellEmpty = (board, index) => {
  const list = toFlatList(board)
  return list[index].type === 'Empty'
}

// Is the game finished?
type IsFinished = (board: BoardType) => boolean
export const isFinished: IsFinished = board =>
  toFlatList(board).every(cell => cell.type !== 'Empty')

// Extract the cells from the board at the given indices
type GetCells = (Array<number>, BoardType) => Maybe<Array<CellType>>
export const getCells: GetCells = (selection, board) => {
  const flattened = toFlatList(board)
  const cells = selection.reduce((acc, index) => {
    const cell = flattened[index]
    return cell.type !== 'Empty' ? [...acc, cell] : acc
  }, [])

  if (cells.length === 3 && cells.every(cell => cell.type !== 'Empty')) {
    return _Just(cells)
  }
  return Nothing
}

// Search the given 'row' for a match, if found the player is returned
type FindMatch = (Maybe<Array<CellType>>) => Maybe<Player>
export const findMatch: FindMatch = row => {
  switch (row.type) {
    case 'Nothing':
      return Nothing
    case 'Just':
      const [cell1, cell2, cell3] = row.result
      if (cell1.type === cell2.type && cell1.type === cell3.type) {
        const player = cell1.type === 'Cross' ? Player1 : Player2
        return _Just(player)
      }
      return Nothing
    default:
      return Nothing
  }
}

type IsWinner = BoardType => Result
export const isWinner: IsWinner = (board, player) => {
  const rows: Array<Array<number>> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  return rows.reduce((acc, indices) => {
    // Short circuit the search if a match is found
    if (acc.type !== 'Nothing') {
      return acc
    }
    const row = getCells(indices, board)
    if (row.type !== 'Nothing') {
      const match = findMatch(row)
      if (match.type !== 'Nothing') {
        return _Just({ player: match.result, row: row.result })
      }
    }
    return Nothing
  }, Nothing)
}
