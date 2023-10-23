import React, { useEffect, useState } from 'react';
import './App.css'
import BordComponent from './components/BordComponent';
import { Board } from './models/Board';
import { player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';

const App = () => {
  const [board,setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<player | null>(null)
  useEffect(()=>{
    restart()
    setCurrentPlayer(whitePlayer)
    },[])

function restart(){
  const newBoard = new Board();
  newBoard.initCells()
  newBoard.addFigures()
  setBoard(newBoard)
}
function swapPlayer(){
  setCurrentPlayer(currentPlayer?.color === Colors.WHITE?blackPlayer:whitePlayer)
}

  return (
    <div className='app'>
      <Timer 
        restart={restart}
        currentPlayer={currentPlayer}
      />
      <BordComponent 
      board = {board}
      setBoard = {setBoard}
      currentPlayer = {currentPlayer}
      swapPlayer = {swapPlayer}
      />
      <div>
      <LostFigures
        title="белые"
        figures={board.lostWhiteFigure}
        />

        <LostFigures
        title="черные"
        figures={board.lostBlackFigure}
        />
      </div>
    </div>
  );
}

export default App;
