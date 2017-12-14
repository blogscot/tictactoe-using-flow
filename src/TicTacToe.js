// @flow

import React from 'react'
import Board from './Board'
import {
  switchPlayer,
  updateCell,
  isCellEmpty,
  isFinished,
  isWinner,
} from './Helpers'
import { Player1 } from './Constants'
import './TicTacToe.css'

const empty: Empty = { type: 'Empty' }
const emptyRow: Row = [empty, empty, empty]
const board: BoardType = [emptyRow, emptyRow, emptyRow]

class TicTacToe extends React.Component<*, State> {
  state = {
    board: board,
    status: { type: 'Running' },
    player: Player1,
  }
  setCell = (index: BoardIndex): void => {
    this.setState(prevState => {
      const { board, player } = prevState
      if (!isCellEmpty(board, index)) return prevState
      const updatedBoard = updateCell(board, player, index)
      const winner = isWinner(updatedBoard)
      if (winner.type !== 'Nothing') {
        return {
          board: updatedBoard,
          status: winner,
        }
      } else if (isFinished(updatedBoard)) {
        return {
          board: updatedBoard,
          status: { type: 'Nothing' },
        }
      } else {
        return {
          board: updatedBoard,
          player: switchPlayer(player),
        }
      }
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
