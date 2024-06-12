import React, { useEffect, useState } from 'react';

const EvaluationBar = ({ fen, depth, onBestMove }) => {
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    if (!fen) {
      console.log('No FEN provided.');
      return;
    }

    const stockfish = new Worker('/stockfish.js');

    stockfish.onmessage = (event) => {
      const message = event.data;
      console.log('Stockfish message:', message);

      if (message.includes('bestmove')) {
        const bestMove = parseBestMove(message);
        if (bestMove) {
          onBestMove(bestMove);
        }
      }

      if (message.includes('score')) {
        const score = parseScore(message);
        setEvaluation(score);
      }
    };

    stockfish.postMessage('uci');
    stockfish.postMessage(`position fen ${fen}`);
    stockfish.postMessage(`go depth ${depth}`);

    return () => {
      stockfish.terminate();
      console.log('Terminated Stockfish worker');
    };
  }, [fen, depth, onBestMove]);

  const parseBestMove = (message) => {
    const match = message.match(/bestmove (\w+)/);
    if (match) {
      return match[1];
    }
    return null;
  };

  const parseScore = (message) => {
    const match = message.match(/score (cp|mate) (-?\d+)/);
    if (match) {
      const type = match[1];
      const value = parseInt(match[2], 10);
      if (type === 'mate') {
        return `Mate in ${value}`;
      } else {
        return value / 100; // Return raw score for evaluation
      }
    }
    return null;
  };

  let whiteHeight = 50;
  let blackHeight = 50;

  if (evaluation !== null) {
    if (evaluation >= 0) {
      whiteHeight = Math.min(50 + (evaluation * 5), 100); // Aggressive scaling
      blackHeight = 100 - whiteHeight;
    } else {
      blackHeight = Math.min(50 + (Math.abs(evaluation) * 5), 100); // Aggressive scaling
      whiteHeight = 100 - blackHeight;
    }
  }

  return (
    <div className="relative h-96 w-14 mr-2 mt-14 ml-1">
      {evaluation !== null ? (
        <>
          <div className="absolute top-0 left-0 right-0 text-center z-10">
            <span className="font-bold text-black">{evaluation}</span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end">
            <div
              className="bg-white"
              style={{ height: `${whiteHeight}%` }}
            ></div>
            <div
              className="bg-gray-800"
              style={{ height: `${blackHeight}%` }}
            ></div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          Evaluating...
        </div>
      )}
    </div>
  );
};

export default EvaluationBar;