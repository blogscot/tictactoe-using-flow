// @flow

import React from 'react'
import Board from './Board'
import { switchPlayer, updateCell, isCellEmpty } from './Helpers'
import './TicTacToe.css'

const empty: Empty = { type: 'Empty' }
const emptyRow: Row = [empty, empty, empty]
const board: BoardType = [emptyRow, emptyRow, emptyRow]

class TicTacToe extends React.Component<*, State> {
  state = {
    board: board,
    status: { type: 'Running' },
    player: 0,
  }
  setCell = (index: BoardIndex): void => {
    this.setState(state => {
      const { board, player } = state
      return isCellEmpty(board, index)
        ? {
            player: switchPlayer(player),
            board: updateCell(board, player, index),
          }
        : {}
    })
  }
  render() {
    const { board } = this.state
    return (
      <div style={boardStyle}>
        {<Board board={board} updateCell={this.setCell} />}
      </div>
    )
  }
}

const boardStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '3rem',
}

export default TicTacToe
