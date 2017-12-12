// @flow
import { Player1, Player2 } from '../Constants'

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
type IsCellEmpty = (BoardType, BoardIndex) => boolean
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
    return { type: 'Just', result: cells }
  }
  return { type: 'Nothing' }
}

type ValidateRow = (Maybe<Array<CellType>>) => Player | null
const validateRow: ValidateRow = row => {
  if (row.type === 'Nothing') return null
  const [cell1, cell2, cell3] = row.result
  if (cell1.type === cell2.type && cell1.type === cell3.type) {
    return cell1.type === 'Cross' ? Player1 : Player2
  }
  return null
}
