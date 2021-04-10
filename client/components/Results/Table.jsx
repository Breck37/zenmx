import React, { useState, useEffect } from "react";
import { useCurrentMode } from "../../hooks/currentMode";
import { Overlay } from "../Overlay";
import { TableStyled } from "./styles";

const Table = ({ rows, children, hasOverlay, currentRow, setCurrentRow }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const { currentMode } = useCurrentMode();
  useEffect(() => {
    if (currentRow && !showOverlay) {
      setShowOverlay(true);
    }
  }, [currentRow, showOverlay]);

  const handleCloseOverlay = () => {
    setCurrentRow();
    setShowOverlay(false);
  };

  return (
    <TableStyled
      raceResultsLength={rows.length}
      hasOverlay={showOverlay}
      currentMode={currentMode}
    >
      {hasOverlay && (
        <Overlay
          showOverlay={showOverlay}
          currentRider={currentRow}
          handleClick={handleCloseOverlay}
        />
      )}
      <>{children}</>
    </TableStyled>
  );
};
export default Table;
