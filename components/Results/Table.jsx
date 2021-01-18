import React from "react";
import { TableStyled } from "./styles";

const Table = ({ raceResults }) => {
  return (
    <TableStyled raceResultsLength={raceResults.length}>
      {raceResults.map((result) => result.riderName)}
    </TableStyled>
  );
};
export default Table;
