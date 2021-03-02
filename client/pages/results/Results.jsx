import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, RiderRow } from "../../components";
import { ResultsStyled } from "../../styles";

const Results = () => {
  const [raceResults, setResults] = useState([]);
  const [currentRider, setCurrentRider] = useState(null);

  useEffect(() => {
    if (!raceResults || !raceResults.length) {
      axios
        .get("/api/get-live-results")
        .then(({ data }) => {
          setResults(data.raceResults);
        })
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [raceResults]);

  const handleClickedRider = (rider) => {
    setCurrentRider(rider);
  };

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

  return (
    <ResultsStyled style={{ backgroundColor: "purple" }}>
      <main>
        {raceResults && raceResults.length ? (
          <Table
            rows={raceResults}
            hasOverlay
            currentRow={currentRider}
            setCurrentRow={() => setCurrentRider(null)}
          >
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
          </Table>
        ) : null}
      </main>
    </ResultsStyled>
  );
};

export default Results;
