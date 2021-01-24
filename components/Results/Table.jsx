import React, { useState } from "react";
import RiderRow from "./RiderRow";
import { Overlay } from "../Overlay";
import { TableStyled } from "./styles";

const TableHeaderRow = {
  position: "Pos",
  riderName: "Rider Name",
  team: "Team",
  bestLap: "Best Lap",
  lastLap: "Last Lap",
  number: "#",
  currentLap: "Lap",
  bike: "Bike",
};

const Table = ({ raceResults }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentRider, setCurrentRider] = useState(null);

  const handleClickedRider = (rider) => {
    console.log("HEY", rider);
    setCurrentRider(rider);
    setShowOverlay(true);
  };

  const handleCloseRider = () => {
    setCurrentRider(null);
    setShowOverlay(false);
  };

  return (
    <TableStyled
      raceResultsLength={raceResults.length}
      hasOverlay={showOverlay}
    >
      <Overlay
        showOverlay={showOverlay}
        currentRider={currentRider}
        handleClick={handleCloseRider}
      />
      <RiderRow rider={TableHeaderRow} row={0} />
      {raceResults
        .sort((a, b) => a.position - b.position)
        .map((riderResult, row) => {
          return (
            <RiderRow
              key={`${riderResult.position}-${riderResult.number}`}
              rider={riderResult}
              row={(row += 2)}
              onClick={() => handleClickedRider(riderResult)}
            />
          );
        })}
    </TableStyled>
  );
};
export default Table;
