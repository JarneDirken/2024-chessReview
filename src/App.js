import React, { useState } from 'react';
import ChessBoard from './components/ChessBoard';
import PGNUploader from './components/PGNUploader';
import GameOverView from './components/GameOverView';
import EvaluationBar from './components/EvaluationBar';
import DepthSlider from './components/DepthSlider';
import Legend from './components/Legend';

const App = () => {
  const [orientationMode, setOrientationMode] = useState("white");
  const [gameDetails, setGameDetails] = useState(null);
  const [fen, setFen] = useState(null);
  const [depth, setDepth] = useState(10);
  const [bestMove, setBestMove] = useState(null);

  const handleUpload = (details) => {
    setGameDetails(details);
    if (details && details.startingFen) {
      setFen(details.startingFen);
    }
  };

  const handleFenChange = (newFen) => {
    setFen(newFen);
  };

  const handleDepthChange = (newDepth) => {
    setDepth(newDepth);
  };

  const toggleOrientation = () => {
    setOrientationMode((prevMode) => (prevMode === "white" ? "black" : "white"));
  };

  const handleBestMoveChange = (move) => {
    setBestMove(move);
  };

  return (
    <div className="flex overflow-hidden mt-2">
      <EvaluationBar fen={fen} depth={depth} onBestMove={handleBestMoveChange} />
      <ChessBoard 
        gameDetails={gameDetails} 
        orientation={orientationMode}
        onFenChange={handleFenChange}
        bestMove={bestMove}
      />
      <div className='ml-2'>
        <GameOverView gameDetails={gameDetails} toggleOrientation={toggleOrientation} />
        <PGNUploader onUpload={handleUpload} />
        <DepthSlider depth={depth} onDepthChange={handleDepthChange} />
        <Legend />
      </div>
    </div>
  );
};

export default App;
