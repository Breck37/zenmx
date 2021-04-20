import React from "react";
import LeagueCardStyled from "./LeagueCardStyled";
import { ResultsPodium } from "../";

const LeagueCard = ({ leaguePicks }) => {
  console.log({
    leaguePicks,
  });
  return (
    <LeagueCardStyled>
      {leaguePicks.map((pick) => {
        console.log({ pick });
        return (
          <div className="pick">
            <h1>{pick.user}</h1>
            <h4>{pick.totalPoints}</h4>
            {pick.bigBikePicks
              .sort((a, b) => a.position - b.position)
              .map((rider) => {
                return (
                  <div className="rider-row">
                    <h5>{rider.riderName}</h5>
                    <h6>{rider.points}</h6>
                  </div>
                );
              })}
          </div>
        );
      })}
    </LeagueCardStyled>
  );
};

export default LeagueCard;
