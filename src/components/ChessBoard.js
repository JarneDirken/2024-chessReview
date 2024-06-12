import React, { useState, useEffect, useRef } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessBoard = ({ gameDetails, orientation, onFenChange, bestMove }) => {
  const [game, setGame] = useState(new Chess());
  const [moveIndex, setMoveIndex] = useState(0);
  const [moves, setMoves] = useState([]);
  const [highlightedSquares, setHighlightedSquares] = useState({});
  const [playedBestMove, setPlayedBestMove] = useState(null); // Track the move that was the best move when it was played
  const gameRef = useRef(new Chess());

  useEffect(() => {
    if (!gameDetails || !gameDetails.pgn) {
      const newGame = new Chess();
      setGame(newGame);
      setMoves([]);
      setMoveIndex(0);
      gameRef.current = newGame;
      onFenChange(newGame.fen());
      return;
    }

    const newGame = new Chess();
    newGame.loadPgn(gameDetails.pgn);
    setMoves(newGame.history({ verbose: true }));
    gameRef.current = new Chess();
    setMoveIndex(0);
    onFenChange(newGame.fen());
  }, [gameDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        if (moveIndex < moves.length) {
          const move = moves[moveIndex];
          gameRef.current.move(move);
          setMoveIndex(moveIndex + 1);
          setGame(new Chess(gameRef.current.fen())); // Update game state
          onFenChange(gameRef.current.fen()); // Notify parent component
          const isBestMove = bestMove && move.from === bestMove.slice(0, 2) && move.to === bestMove.slice(2, 4);
          setHighlightedSquares({
            [move.from]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
            [move.to]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
          });
          if (isBestMove) {
            setPlayedBestMove(move); // Update the played best move
          } else {
            setPlayedBestMove(null); // Reset if the move wasn't the best move
          }
        }
      } else if (event.key === 'ArrowLeft') {
        if (moveIndex > 0) {
          gameRef.current.undo();
          setMoveIndex(moveIndex - 1);
          setGame(new Chess(gameRef.current.fen())); // Update game state
          onFenChange(gameRef.current.fen()); // Notify parent component
          const prevMove = moves[moveIndex - 2];
          if (prevMove) {
            const isBestMove = bestMove && prevMove.from === bestMove.slice(0, 2) && prevMove.to === bestMove.slice(2, 4);
            setHighlightedSquares({
              [prevMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
              [prevMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
            });
            if (isBestMove) {
              setPlayedBestMove(prevMove); // Update the played best move
            } else {
              setPlayedBestMove(null); // Reset if the move wasn't the best move
            }
          } else {
            setHighlightedSquares({});
            setPlayedBestMove(null); // Reset the played best move
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveIndex, moves, onFenChange, bestMove]);

  const getSquarePosition = (square) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['1', '2', '3', '4', '5', '6', '7', '8'];

    const fileIndex = files.indexOf(square[0]);
    const rankIndex = ranks.indexOf(square[1]);

    return {
      top: orientation === 'white' ? (7 - rankIndex) * 75 : rankIndex * 75,
      left: orientation === 'white' ? fileIndex * 75 : (7 - fileIndex) * 75,
    };
  };

  const customSquareStyles = {
    ...highlightedSquares,
    ...(playedBestMove && {
      [playedBestMove.from]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
      [playedBestMove.to]: { backgroundColor: 'rgba(255, 255, 0, 0.5)' },
    }),
  };

  return (
    <div style={{ position: 'relative', width: '600px', height: '600px' }}>
      <Chessboard
        position={game.fen()}
        animationDuration={200}
        boardWidth={600}
        arePiecesDraggable={false}
        boardOrientation={orientation}
        customSquareStyles={customSquareStyles}
      />
      {playedBestMove && (
        <div
          style={{
            position: 'absolute',
            top: -20,
            left: 10,
            width: '600px',
            height: '600px',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'absolute',
              ...getSquarePosition(playedBestMove.to),
              width: '75px',
              height: '75px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '32px', color: 'green' }}>★</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
