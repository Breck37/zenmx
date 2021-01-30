import React from "react";
import { RiderRowStyled } from "./styles";

// Props //
// rider {
// position,
// riderName,
// team,
// bestLap,
// lastLap,
// number,
// currentLap,
// bike,
// }
// row =  number

const RiderRow = ({ rider, row, onClick }) => {
  const {
    position,
    riderName,
    team,
    bestLap,
    lastLap,
    number,
    currentLap,
    bike,
  } = rider;
  return (
    <RiderRowStyled
      onClick={onClick}
      row={row}
      bike={bike.split(" ")[0].toLowerCase()}
    >
      <div className="position">{position}</div>
      <div className="name">{riderName}</div>
      <div className="number">{number}</div>
      <div className="team">
        <div>{team}</div>
      </div>
      <div className="bestLap">{bestLap}</div>
      <div className="lastLap">{lastLap}</div>
      <div className="currentLap">{currentLap}</div>
    </RiderRowStyled>
  );
};

export default RiderRow;
