import React, { useState } from 'react';

function Game(props) {

    const [gameFound, setGameFound] = useState(false);
    const [gameCode, setGameCode] = useState('');

    const connectToGame = () => {
        //do axios post with specific game code
    }

    const startGame = () => {
        //connect to random game
        setGameFound(true);
    }

    return (
        <div className="game-queue-root">
            <form onSubmit={connectToGame}>
                <input 
                    type='text' 
                    value={gameCode} 
                    name='game-room-code'
                    onChange={(e) => setGameCode(e.target.value)}
                    required
                    />
                <input type='submit' value='Enter Specific Game' />
            </form>
            <button onClick={startGame}>Start Random Game</button>
            {
                gameFound &&
                <div className='game-board'>
                    <div className='game-board-row'>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                    </div>
                    <div className='game-board-row'>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                    </div>
                    <div className='game-board-row'>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                        <button className='game-board-tile'></button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Game;