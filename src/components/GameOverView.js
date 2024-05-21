// src/components/GameOverView.js
import React from 'react';

const GameOverView = ({ gameDetails, toggleOrientation }) => {
  return (
    <div>
      <button className='border border-gray-700 p-1 rounded-lg' onClick={toggleOrientation}>Flip board</button>
      <div>
        {gameDetails && (
            <>
                <h2>Game Details</h2>
                <p><strong>White:</strong> {gameDetails.whiteName} ({gameDetails.whiteElo})</p>
                <p><strong>Black:</strong> {gameDetails.blackName} ({gameDetails.blackElo})</p>
            </>
        )}
      </div>
    </div>
  );
};

export default GameOverView;
