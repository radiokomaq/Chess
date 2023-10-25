import React, { FC, useEffect, useState } from 'react'
import { Board } from '../models/Board';
import CellComponent from './CellComponent';
import { Cell } from '../models/Cell';
import { player } from '../models/Player';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: player | null;
  swapPlayer: () => void;
}

const BordComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
  function highLightCell() {
    board.highLightCells(selectedCell)
    updateBoard()

  }
  function updateBoard() {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }
  useEffect(() => {

    highLightCell()

  }, [selectedCell])
  function click(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null)
      updateBoard()
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell)
      }

    }







  }
  return (
    <div>
    <div>
      сет Player: <b >{currentPlayer?.color}</b>
      </div>
        <div
      className='board'>
      {board.cells.map((row, index) =>
        <React.Fragment key={index}>
          {row.map(cell =>
            <CellComponent click={click} cell={cell} key={cell.id} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y} />
          )}
        </React.Fragment>
      )}
    </div>
    </div>

  )
}

export default BordComponent