import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { player } from '../models/Player';

interface TimerProps {
    currentPlayer: player | null;
    restart: () => void
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    useEffect(() => {
        startTimer()

    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)


    }

const  handleRestart = ()=>{
    setBlackTime(300)
    setWhiteTime(300)
    restart()
}

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)

        
    }
    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)

    }
    function loosWhite(){
        alert('Белые луз')
        handleRestart()
    }
    function loosBlack(){
        alert('Черные луз')
        handleRestart()
    }
    const whiteTimer = whiteTime <= -1 ? loosWhite() : whiteTime;
    const blackTimer = blackTime <= -1 ? loosBlack() : blackTime;
    return (
        <div>
            <div>
                <button onClick={handleRestart}>
                    Restart GAME
                </button>
            </div>
            <h2>Black = {blackTime}</h2>
            <h2>White = {whiteTime}</h2>
        </div>
    )
}

export default Timer