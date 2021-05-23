import React from 'react';
import LeagueCardStyled from './LeagueCardStyled';

const LeagueCard = ({ leaguePicks }) => {
  return (
    <LeagueCardStyled>
      {leaguePicks.map((pick) => {
        return (
          <div key={pick.user} className="pick">
            <h1>{pick.user}</h1>
            <h4>{pick.totalPoints}</h4>
            {pick.bigBikePicks
              .sort((a, b) => a.position - b.position)
              .map((rider) => {
                return (
                  <div className="rider-row" key={rider.position}>
                    <h5>
                      <b>
                        {rider.position === 100
                          ? 'FL: '
                          : `${rider.position}: `}
                      </b>
                      {rider.riderName}
                    </h5>
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
