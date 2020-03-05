import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import { useUser } from '../context/usr.js';

import '../stylesheets/Game.css';

function Game(props) {

  const [gameFound, setGameFound] = useState(false);
  const [gameCode, setGameCode] = useState('');
  const [gameBoard, setGameBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [opponent, setOpponent] = useState('');
  const [isTurn, setTurn] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState('O');

  const { userDetails } = useUser();
  const socket = useRef(null);

  // Start socket connection to server
  useEffect(() => {
    socket.current = io();
  }, []);


  // Setup connection between clients
  useEffect(() => {
    // Check to see if the server sends a start game event socket
    socket.current.on('start-game', (opponent) => {
      console.log('player', playerSymbol);
      setOpponent(opponent);
      setGameFound(true);
    });

    socket.current.on('remove-from-queue-and-start-game', (opponent) => {
      console.log('setting player to X')
      setPlayerSymbol('X');
      setTurn(true);
      socket.current.emit('remove-from-queue', opponent);
    })
  });

  const connectToGame = () => {
    //do axios post with specific game code
  }

  const startGame = () => {
    //connect to random game
    socket.current.emit('find-random-game', userDetails.username);
  }

  // Updates the game-board, socket sends the whole game board to client
  useEffect(() => {
    socket.current.on('update-board', (board) => {
      console.log('updating game board')
      setGameBoard(board);
    });
  });

  // Updates the turns of the player - socket retrieves the player going next
  useEffect(() => {
    socket.current.on('update-turn', (nextTurn) => {
      if (nextTurn === opponent) {
        setTurn(false);
      } else {
        setTurn(true);
      }
    });
  });

  // Sets the move and sends the board to the server
  function setMove(e) {
    let position = e.target.id;
    console.log(e.target.id)
    let currentGameBoard = gameBoard;
    console.log(currentGameBoard);

    if (currentGameBoard[position] === '') {
      currentGameBoard[position] = playerSymbol;
      socket.current.emit('set-board', currentGameBoard);
      socket.current.emit('set-next-player', opponent);
    } else {
      console.log('already have a piece there');
    }
  }

  return (
    <div className='game-root'>
      <div className='game-queue-root'>
        <div className='game-queue-form'>
          <form onSubmit={connectToGame}>
            <input
              type='text'
              value={gameCode}
              name='game-room-code'
              placeholder='Game Room Code'
              onChange={(e) => setGameCode(e.target.value)}
              required
            />
            <input type='submit' value='Enter Specific Game' />
          </form>
          <button onClick={startGame}>Start Random Game</button>
        </div>
      </div>

      {
        gameFound &&
        <div className='game-board'>
          <div className='game-board-row'>
            <button className='game-board-tile' id='0' onClick={setMove}>{gameBoard[0]}</button>
            <button className='game-board-tile' id='1' onClick={setMove}>{gameBoard[1]}</button>
            <button className='game-board-tile' id='2' onClick={setMove}>{gameBoard[2]}</button>
          </div>
          <div className='game-board-row'>
            <button className='game-board-tile' id='3' onClick={setMove}>{gameBoard[3]}</button>
            <button className='game-board-tile' id='4' onClick={setMove}>{gameBoard[4]}</button>
            <button className='game-board-tile' id='5' onClick={setMove}>{gameBoard[5]}</button>
          </div>
          <div className='game-board-row'>
            <button className='game-board-tile' id='6' onClick={setMove}>{gameBoard[6]}</button>
            <button className='game-board-tile' id='7' onClick={setMove}>{gameBoard[7]}</button>
            <button className='game-board-tile' id='8' onClick={setMove}>{gameBoard[8]}</button>
          </div>
        </div>
      }
    </div>
  );
}

export default Game;