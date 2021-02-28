import React, { useState, useEffect } from "react";
import { Overlay } from "../Overlay";
import { TableStyled } from "./styles";

const Table = ({ rows, children, hasOverlay, currentRow, setCurrentRow }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  console.log(currentRow, showOverlay);
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
    <TableStyled raceResultsLength={rows.length} hasOverlay={showOverlay}>
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
