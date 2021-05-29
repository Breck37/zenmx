import React, { useEffect, useState, useMemo } from 'react';
// import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import { useCurrentMode, useAuth } from '../../hooks';
import { useRaceResults } from '../../hooks/raceResults';
import { 
  Button, 
  // LeagueCard
} from '../../components';
import { HomeStyled } from '../../styles';
// import { manufacturers } from '../../constants';
import { useCurrentRound } from '../../hooks/currentRound';

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const currentRound = useCurrentRound();
  const currentWeekWithLiveResults = useRaceResults();
  const { user, loading } = useAuth();
  const [userWithPicks, setUserWithPicks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [assignedPoints, setAssignedPoints] = useState(null);

  
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
          if (userData.success) {
            setUserWithPicks(userData.user);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 200);
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
    return {};
  }, [userWithPicks, userWithPicks?.picks]);

  if (loading || isLoading || !currentWeekWithLiveResults || !user || !userWithPicks) {
    return <CircularProgress />;
  }

  const assignPoints = () => {
    axios
      .post(`/api/assign-points?week=${currentWeekWithLiveResults.week}`, {
        raceResults: currentWeekWithLiveResults,
      })
      .then((res) => {
        if (res.data.success) {
          setAssignedPoints(res.data);
        }
      })
      .catch((e) => console.warn('ERROR', { e }));
  };  

  console.log({
    userWithPicks
  })

  return (
    <HomeStyled currentMode={currentMode}>
      {user.email === process.env.ADMIN_USER &&
      currentWeekWithLiveResults.liveResults ? (
        <Button label="Assign Points" onClick={assignPoints} assignedPoints={assignedPoints} />
      ) : null}
      <div className="user-details">
        <h1>{`Current Round: ${currentWeekWithLiveResults.week}`}</h1>
        <h2>{`${lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]} Score: ${lastRoundDetails.totalPoints}`}</h2>
        <h2>{`${lastRoundDetails.type[0].toUpperCase() + lastRoundDetails.type[1]} Round ${lastRoundDetails.week} Rank: ${lastRoundDetails.rank}`}</h2>
      </div>
      {/* <LeagueCard
        leaguePicks={userWithPicks.leaguePicks[currentRound.leagueRoundToShow]}
      /> */}
      {/* {!currentWeekWithLiveResults.message &&
      currentWeekWithLiveResults.liveResults &&
      currentWeekWithLiveResults.liveResults?.fastestLaps.length > 0 ? (
        <>
          <div className="marquee">
            <div className="animation-container">
              <span>FAST LAPS</span>
              {currentWeekWithLiveResults.liveResults.fastestLaps.map(
                ({ rider, lap, bike }, index) => {
                  return (
                    <div
                      key={`${rider}-fast-lap`}
                      className={`fast-lap ${index}`}
                    >
                      <img
                        src={manufacturers[bike.toLowerCase()].image}
                        alt=""
                        className="rider-image"
                      />
                      <div>{rider}</div>
                      <div>{lap}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="mobile-fast-laps">
            <h3>Top 3 LapTimes</h3>
            {currentWeekWithLiveResults.liveResults.fastestLaps
              .slice(0, 3)
              .map(({ rider, lap, bike }, index) => {
                return (
                  <div
                    key={`${rider}-fast-lap`}
                    className={`fast-lap ${index}`}
                  >
                    <img
                      src={manufacturers[bike.toLowerCase()].image}
                      alt=""
                      className="rider-image"
                    />
                    <div>{rider}</div>
                    <div>{lap}</div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div className="user-details">{currentWeekWithLiveResults.message}</div>
      )} */}
      <main>
        <h1 className="title"></h1>
      </main>
    </HomeStyled>
  );
};

export default Home;
