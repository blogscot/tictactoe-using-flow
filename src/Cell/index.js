import React from 'react'

type CellProps = {
  cell: CellType,
  onClick: (index: BoardIndex) => void,
}

const Cell = ({ cell, onClick }: CellProps) => {
  return (
    <div style={cellStyle} onClick={onClick}>
      {displayCell(cell)}
    </div>
  )
}

const cellStyle = {
  float: 'left',
  backgroundColor: '#ca6',
  textAlign: 'center',
  fontSize: '3.5rem',
  border: '1px solid #eee',
  height: '150px',
  width: '150px',
  verticalAlign: '50%',
  lineHeight: '150px',
}

const displayCell = (cell: CellType): string => {
  switch (cell.type) {
    case 'Circle':
      return 'O'
    case 'Cross':
      return 'X'
    default:
      return ''
  }
}

export default Cell
