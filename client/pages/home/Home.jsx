import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useCurrentMode } from "../../hooks/currentMode";
import { useRaceResults } from "../../hooks/raceResults";
import { Button } from "../../components";
import { HomeStyled } from "../../styles";
import { manufacturers, currentRound } from "../../constants";

const Home = () => {
  const { currentMode } = useCurrentMode();
  const currentWeekWithLiveResults = useRaceResults();
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useUser();
  const [userWithPicks, setUserWithPicks] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      setUserWithPicks(null);
      router.push("/login");
      return null;
    }

    if (user && !userWithPicks) {
      axios
        .get(`/api/get-user/${user?.email}`)
        .then(({ data: userData }) => {
          if (userData.success) {
            setUserWithPicks(userData.user);
          }
          setTimeout(() => {
            setLoading(false);
          }, 200);
        })
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [user]);

  const lastRoundScore = useMemo(() => {
    if (userWithPicks && userWithPicks.picks.length) {
      const lastRound = userWithPicks.picks[userWithPicks.picks.length - 1];

      return lastRound.totalPoints;
    }

    return 0;
  }, [userWithPicks, userWithPicks?.picks]);

  if (loading || isLoading || !currentWeekWithLiveResults) {
    return <CircularProgress />;
  }

  if (currentWeekWithLiveResults.message) {
    return (
      <HomeStyled currentMode={currentMode}>
        <div className="user-details">{currentWeekWithLiveResults.message}</div>
      </HomeStyled>
    );
  }

  const assignPoints = () => {
    axios
      .post(`/api/assign-points?week=${currentRound.week}`, {
        raceResults: currentWeekWithLiveResults,
      })
      .then((res) => {
        console.log({ res: res.data });
      })
      .catch((e) => console.warn("ERROR", { e }));
  };
  console.log({ userWithPicks, currentWeekWithLiveResults, window });
  return (
    <HomeStyled currentMode={currentMode}>
      {user.name === process.env.ADMIN_USER && (
        <Button label="Assign Points" onClick={assignPoints} />
      )}
      <div className="user-details">
        <h1>{`Current Round: ${currentWeekWithLiveResults.week}`}</h1>
        <h2>{`Last Round Score: ${lastRoundScore}`}</h2>
      </div>
      {currentWeekWithLiveResults.liveResults.fastestLaps &&
      currentWeekWithLiveResults.liveResults.fastestLaps.length > 0 ? (
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
      ) : null}
      <main>
        <h1 className="title"></h1>
      </main>
    </HomeStyled>
  );
};

export default Home;
