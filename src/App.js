// src/App.js
import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import PGNUploader from './components/PGNUploader';

const App = () => {
  const [pgn, setPgn] = useState('');

  return (
      <div className="flex">
        <ChessBoard pgn={pgn} />
        <div className="pgn-uploader">
          <PGNUploader onUpload={setPgn} />
        </div>
      </div>
  );
};

export default App;
