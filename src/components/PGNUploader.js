// src/components/PGNUploader.js
import React, { useState } from 'react';

const PGNUploader = ({ onUpload }) => {
  const [pgn, setPgn] = useState('');

  const handleInputChange = (event) => {
    setPgn(event.target.value);
  };

  const handleUpload = () => {
    onUpload(pgn);
  };

  return (
    <div>
      <textarea
        rows="20"
        cols="50"
        value={pgn}
        onChange={handleInputChange}
        placeholder="Paste your PGN text here..."
      />
      <br />
      <button onClick={handleUpload}>Upload PGN</button>
    </div>
  );
};

export default PGNUploader;
