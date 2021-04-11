import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0";
import { manufacturers } from "../../constants";
import { Table, RiderRow } from "../../components";
import { ResultsStyled } from "../../styles";
import { useRouter } from "next/router";
import { CircularProgress } from "@material-ui/core";
import { useRaceResults } from "../../hooks/raceResults";
import { useCurrentMode } from "../../hooks/currentMode";

const Results = () => {
  const [currentRider, setCurrentRider] = useState(null);
  const [isLive, setIsLive] = useState(true);
  const { user, isLoading } = useUser();
  const router = useRouter();
  const raceResults = useRaceResults();
  const { currentMode } = useCurrentMode();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
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

  if (isLoading || !raceResults) {
    return <CircularProgress />;
  }

  if (raceResults.message) {
    return (
      <ResultsStyled currentMode={currentMode}>
        <div className="round-details">{raceResults.message}</div>
      </ResultsStyled>
    );
  }

  return (
    <ResultsStyled
      currentMode={currentMode}
      fastLapLeaderLegend={
        manufacturers[raceResults.liveResults.fastLapLeader.bike.toLowerCase()]
          ?.rgb
      }
    >
      <main>
        <div className="round-details">
          <h1>{raceResults.liveResults.round}</h1>
          <h2>{`Week: ${raceResults.week}`}</h2>
          <h4>{raceResults.liveResults.session.split(" - ")[0]}</h4>
        </div>
        <div className="fastest-key">
          <div className="color-sample" />
          <span>Fastest Lap</span>
        </div>
        {raceResults && raceResults.liveResults.raceResults.length ? (
          <Table
            rows={raceResults.liveResults.raceResults}
            hasOverlay
            currentRow={currentRider}
            setCurrentRow={() => setCurrentRider(null)}
          >
            <RiderRow rider={TableHeaderRow} row={0} />
            {raceResults.liveResults.raceResults
              .sort((a, b) => a.position - b.position)
              .map((riderResult, row) => {
                const highlight =
                  riderResult.riderName ===
                  raceResults.liveResults.fastLapLeader.rider
                    ? manufacturers[
                        raceResults.liveResults.fastLapLeader.bike.toLowerCase()
                      ]?.rgb
                    : false;

                return (
                  <RiderRow
                    key={`${riderResult.position}-${riderResult.number}`}
                    rider={riderResult}
                    row={(row += 2)}
                    onClick={() => handleClickedRider(riderResult)}
                    highlight={highlight}
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
