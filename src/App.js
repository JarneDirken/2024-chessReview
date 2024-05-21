import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import PGNUploader from './components/PGNUploader';
import GameOverView from './components/GameOverView';
import EvaluationBar from './components/EvaluationBar';

const App = () => {
  const [orientationMode, setOrientationMode] = useState("white");
  const [gameDetails, setGameDetails] = useState(null);
  const [fen, setFen] = useState(null);

  const handleUpload = (details) => {
    setGameDetails(details);
  };

  const handleFenChange = (newFen) => {
    setFen(newFen);
  };

  const toggleOrientation = () => {
    setOrientationMode((prevMode) => (prevMode === "white" ? "black" : "white"));
  };

  return (
    <div className="flex overflow-hidden mt-2">
      <ChessBoard gameDetails={gameDetails} oriantation={orientationMode} onFenChange={handleFenChange} />
      <div>
        <GameOverView gameDetails={gameDetails} toggleOrientation={toggleOrientation} />
        <PGNUploader onUpload={handleUpload} />
        <EvaluationBar fen={fen} />
      </div>
    </div>
  );
};

export default App;
