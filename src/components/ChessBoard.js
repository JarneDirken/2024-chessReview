// src/components/ChessBoard.js
import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessBoard = ({ pgn }) => {
  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const gameRef = useRef(new Chess());

  useEffect(() => {
    const newGame = new Chess();
    newGame.loadPgn(pgn);
    setMoves(newGame.history({ verbose: true }));
    gameRef.current = new Chess();
    setMoveIndex(0); // Reset move index when new PGN is loaded
  }, [pgn]);

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

  return <Chessboard position={game.fen()} />;
};

export default ChessBoard;
