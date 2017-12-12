import * as React from 'react'

import Cell from '../Cell'

type Props = { board: BoardType, updateCell: (index: BoardIndex) => void }

const Board = ({ board, updateCell }: Props): React$Element<any> => {
  return (
    <div>
      {board.map((row, i) => {
        return (
          <div style={boardStyle} key={i}>
            {row.map((cell, j) => (
              <Cell key={j} cell={cell} onClick={() => updateCell(i * 3 + j)} />
            ))}
          </div>
        )
      })}
    </div>
  )
}

const boardStyle = {
  width: '500px',
  maxHeight: '150px',
}

export default Board
