import React from "react";
import LeagueCardStyled from "./LeagueCardStyled";

const LeagueCard = ({ leaguePicks }) => {
  console.log({
    leaguePicks,
  });
  return (
    <LeagueCardStyled>
      <h1>LeagueCard</h1>
      <div className="round-details"></div>
      <section className="pick-container">
        {leaguePicks.map((pick) => null)}
      </section>
    </LeagueCardStyled>
  );
};

export default LeagueCard;
