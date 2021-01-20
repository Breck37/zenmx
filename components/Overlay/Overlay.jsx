import React from "react";

const Overlay = ({ showOverlay, currentRider }) => {
  if (!showOverlay) return null;
  return (
    <div className="overlay">
      <div className="rider">{currentRider.riderName}</div>
    </div>
  );
};

export default Overlay;
