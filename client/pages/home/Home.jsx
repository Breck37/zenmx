import React, { useEffect, useState, useMemo } from 'react';
// import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useCurrentMode, useAuth } from '../../hooks';
import { useRaceResults } from '../../hooks/raceResults';
import { 
  NoAccess,
  LeagueCard
} from '../../components';
import { HomeStyled } from '../../styles';
import { manufacturers } from '../../constants';
import { useCurrentRound } from '../../hooks/currentRound';

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const currentRound = useCurrentRound();
  const currentWeekWithLiveResults = useRaceResults();
  const { user, loading } = useAuth();
  const [userWithPicks, setUserWithPicks] = useState(null);
  const [userWithNoAccess, setUserWithNoSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    if ((!user || !user.email) && !loading) {
      setUserWithPicks(null);
      router.push('/login');
      return null;
    }

    if (user && user?.email && !userWithPicks) {
      axios
        .get(`/api/get-user/${user?.email}?type=${currentRound.type}`)
        .then(({ data: userData }) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 200);

          if (userData.success) {
            setUserWithPicks(userData.user);
            return;
          }

          setUserWithNoSuccess(userData)
        })
        .catch((e) => console.log('Error getting user > Home', e));
      return;
    }
  }, [user, userWithPicks]);

  const lastRoundDetails = useMemo(() => {
    if (userWithPicks && userWithPicks.picks.length) {
      const latestPick = userWithPicks.picks.sort((a, b) => b.week - a.week)[0];
      if (latestPick.week === currentRound.round && latestPick.rank === null) {
        return userWithPicks.picks.sort((a, b) => b.week - a.week)[1];
      }
      return latestPick;
    }
    return null;
  }, [userWithPicks]);
  

  if(userWithNoAccess) {
    <NoAccess data={userWithNoAccess} />
  }

  if (loading || isLoading || !currentWeekWithLiveResults || !user || !userWithPicks) {
    return <CircularProgress />;
  }
  return (
    <HomeStyled currentMode={currentMode}>
      <div className="user-details">
        <h1>{`Current Round: ${currentWeekWithLiveResults.week}`}</h1>
        <h2>{`${lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]} Score: ${lastRoundDetails.totalPoints}`}</h2>
        <h2>{`${lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]} Round ${lastRoundDetails.week} Rank: ${lastRoundDetails.rank}`}</h2>
      </div>
      <LeagueCard
        leaguePicks={userWithPicks.leaguePicks[currentRound.year][currentRound.type][`week${currentRound.week}`]}
      /> 
       {!currentWeekWithLiveResults.message &&
      currentWeekWithLiveResults &&
      currentWeekWithLiveResults?.fastestLaps.length > 0 ? (
        <>
          {/* <div className="marquee">
            <div className="animation-container">
              <span>FAST LAPS</span>
              {currentWeekWithLiveResults.fastestLaps.map(
                ({ riderName, bestLap, bike }, index) => {
                  console.log({
                    riderName, bestLap
                  })
                  return (
                    <div
                      key={`${riderName}-fast-lap`}
                      className={`fast-lap ${index}`}
                    >
                      <img
                        src={manufacturers[bike.toLowerCase()].image}
                        alt=""
                        className="rider-image"
                      />
                      <div>{riderName}</div>
                      <div>{bestLap}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div> */}
          <div className="mobile-fast-laps">
            <h3>Top 3 LapTimes</h3>
            {currentWeekWithLiveResults.fastestLaps
              .slice(0, 3)
              .map(({ riderName, bestLap, bike }, index) => {
                return (
                  <div
                    key={`${riderName}-fast-lap`}
                    className={`fast-lap ${index}`}
                  >
                    <img
                      src={manufacturers[bike.toLowerCase()].image}
                      alt=""
                      className="rider-image"
                    />
                    <div>{riderName}</div>
                    <div>{bestLap}</div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="user-details">{currentWeekWithLiveResults.message}</div>
      )}
      <main>
        <h1 className="title"></h1>
      </main>
    </HomeStyled>
  );
};

export default Home;
