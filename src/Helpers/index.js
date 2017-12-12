// @flow

export const switchPlayer: Player => Player = player => (player === 0 ? 1 : 0)

const toFlatList: (list: BoardType) => Array<CellType> = list =>
  list.reduce((acc, cell) => acc.concat(cell), [])

const toBoard: (Array<CellType>) => BoardType = (
  [c1, c2, c3, c4, c5, c6, c7, c8, c9]
) => [[c1, c2, c3], [c4, c5, c6], [c7, c8, c9]]

// Assumes Player 0 is 'X', and Player 1 is 'O'
export const updateCell = (
  board: BoardType,
  player: Player,
  index: BoardIndex
): BoardType => {
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
export const isCellEmpty = (board: BoardType, index: BoardIndex): boolean => {
  const list = toFlatList(board)
  return list[index].type === 'Empty'
}

// Is the game finished?
export const isFinished: IsFinished = board =>
  toFlatList(board).every(cell => cell.type !== 'Empty')
