// src/components/ChessBoard.js
import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessBoard = ({ gameDetails, oriantation }) => {
  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const gameRef = useRef(new Chess());

  useEffect(() => {
    if (!gameDetails || !gameDetails.pgn) {
      setGame(new Chess());
      setMoves([]);
      setMoveIndex(0);
      gameRef.current = new Chess();
      return;
    }

    const newGame = new Chess();
    newGame.loadPgn(gameDetails.pgn);
    setMoves(newGame.history({ verbose: true }));
    gameRef.current = new Chess();
    setMoveIndex(0);
  }, [gameDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        if (moveIndex < moves.length) {
          gameRef.current.move(moves[moveIndex]);
          setMoveIndex(moveIndex + 1);
          setGame(new Chess(gameRef.current.fen())); // Update game state
        }
      } else if (event.key === 'ArrowLeft') {
        if (moveIndex > 0) {
          gameRef.current.undo();
          setMoveIndex(moveIndex - 1);
          setGame(new Chess(gameRef.current.fen())); // Update game state
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveIndex, moves]);

  return (
    <Chessboard 
      position={game.fen()} 
      animationDuration={200} 
      boardWidth={600} 
      arePiecesDraggable={false} 
      boardOrientation={oriantation} 
    />
  );
};

export default ChessBoard;