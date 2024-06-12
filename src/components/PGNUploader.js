// src/components/PGNUploader.js
import React, { useState } from 'react';

const PGNUploader = ({ onUpload }) => {
  const [pgn, setPgn] = useState('');

  const handleInputChange = (event) => {
    setPgn(event.target.value);
  };

  const handleUpload = () => {
    if (!pgn.trim()) {
      alert('Please provide a valid PGN.');
      return;
    }

    const gameDetails = extractGameDetails(pgn);
    onUpload(gameDetails);
  };

  const extractGameDetails = (pgn) => {
    const lines = pgn.split('\n');
    const details = {};
    lines.forEach(line => {
      const match = line.match(/^\[(\w+)\s+"(.+)"\]$/);
      if (match) {
        details[match[1]] = match[2];
      }
    });
    return {
      pgn,
      whiteName: details.White || 'Unknown',
      blackName: details.Black || 'Unknown',
      whiteElo: details.WhiteElo || 'Unknown',
      blackElo: details.BlackElo || 'Unknown',
      startingFen: details.FEN  || '',
    };
  };

  return (
    <div>
      <textarea
        value={pgn}
        onChange={handleInputChange}
        placeholder="Paste your PGN text here..."
        style={{ width: '400px', height: '200px' }} // Adjust the width and height as needed
      />
      <br />
      <button onClick={handleUpload}>Upload PGN</button>
    </div>
  );
};

export default PGNUploader;
