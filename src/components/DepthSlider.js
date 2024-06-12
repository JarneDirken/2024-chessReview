import React from 'react';

const DepthSlider = ({ depth, onDepthChange }) => {
  return (
    <div className="flex justify-center items-center gap-2">
      <label htmlFor="depth">Evaluation Depth: {depth}</label>
      <input
        type="range"
        id="depth"
        min="1"
        max="20"
        value={depth}
        onChange={(e) => onDepthChange(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default DepthSlider;
