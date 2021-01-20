import React from "react";
import { RiderRow } from ".";
import { TableStyled } from "./styles";

const Table = ({ raceResults }) => {
  return (
    <TableStyled raceResultsLength={raceResults.length}>
      <div className="headerRow"></div>
      {raceResults
        .sort((a, b) => a.position - b.position)
        .map((result, row) => {
          return <RiderRow rider={result} row={row} />;
        })}
    </TableStyled>
  );
};
export default Table;
