import React from "react";
import { RiderRowStyled } from "./styles";

const RiderRow = ({ rider }) => {
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
  console.log({ rider, bike: bike.split(" ")[0].toLowerCase() });
  return (
    <RiderRowStyled bike={bike.split(" ")[0].toLowerCase()}>
      <div className="position">{position}</div>
      <div className="name">{riderName}</div>
      <div className="number">{number}</div>
      <div className="team">{team}</div>
      <div className="bestLap">{bestLap}</div>
      <div className="lastLap">{lastLap}</div>
      <div className="currentLap">{currentLap}</div>
    </RiderRowStyled>
  );
};

export default RiderRow;
