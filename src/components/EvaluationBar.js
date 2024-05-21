import React, { useState, useEffect, useRef } from 'react';

const EvaluationBar = ({ fen }) => {
  const [evaluation, setEvaluation] = useState(null);
  const stockfishRef = useRef(null);

  useEffect(() => {
    const loadStockfish = async () => {
      try {
        const stockfish = new Worker('/stockfish.js');
        stockfishRef.current = stockfish;

        stockfishRef.current.onmessage = (event) => {
          const message = event.data;
          if (message.includes('score')) {
            const match = message.match(/score (cp|mate) (-?\d+)/);
            if (match) {
              const type = match[1];
              const value = parseInt(match[2], 10);
              setEvaluation({ type, value });
            }
          }
        };
      } catch (error) {
        console.error("Error loading Stockfish:", error);
      }
    };

    loadStockfish();

    return () => {
      if (stockfishRef.current) {
        stockfishRef.current.terminate();
      }
    };
  }, []);

  useEffect(() => {
    if (fen && stockfishRef.current) {
      stockfishRef.current.postMessage('ucinewgame');
      stockfishRef.current.postMessage(`position fen ${fen}`);
      stockfishRef.current.postMessage('go depth 15');
    }
  }, [fen]);

  const renderEvaluation = () => {
    if (!evaluation) return null;

    const { type, value } = evaluation;
    if (type === 'cp') {
      const score = value / 100;
      return `Evaluation: ${score}`;
    } else if (type === 'mate') {
      return `Mate in ${Math.abs(value)}`;
    }
    return null;
  };

  return (
    <div className="evaluation-bar" style={{ padding: '10px', background: '#f4f4f4', border: '1px solid #ccc' }}>
      {renderEvaluation()}
    </div>
  );
};

export default EvaluationBar;
