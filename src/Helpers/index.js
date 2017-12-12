// @flow

type SwitchPlayer = Player => Player
export const switchPlayer: SwitchPlayer = player => (player === 0 ? 1 : 0)

type ToFlatList = (list: BoardType) => Array<CellType>
const toFlatList: ToFlatList = list =>
  list.reduce((acc, cell) => acc.concat(cell), [])

type ToBoard = (Array<CellType>) => BoardType
const toBoard: ToBoard = ([c1, c2, c3, c4, c5, c6, c7, c8, c9]) => [
  [c1, c2, c3],
  [c4, c5, c6],
  [c7, c8, c9],
]

// Assumes Player 0 is 'X', and Player 1 is 'O'
type UpdateCell = (BoardType, Player, BoardIndex) => BoardType
export const updateCell: UpdateCell = (board, player, index) => {
  const cells = toFlatList(board)
  const cell = cells[index]
  if (cell && cell.type === 'Empty') {
    const updatedCell: Circle | Cross =
      player === 0 ? { type: 'Cross' } : { type: 'Circle' }
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
