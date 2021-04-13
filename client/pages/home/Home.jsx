import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useCurrentMode } from "../../hooks/currentMode";
import { useRaceResults } from "../../hooks/raceResults";
import { Button } from "../../components";
import { HomeStyled } from "../../styles";
import { manufacturers } from "../../constants";
import { useCurrentRound } from "../../hooks/currentRound";

const Home = () => {
  const router = useRouter();
  const { currentMode } = useCurrentMode();
  const { currentRound } = useCurrentRound();
  const currentWeekWithLiveResults = useRaceResults();
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [userWithPicks, setUserWithPicks] = useState(null);
  const [assignedPoints, setAssignedPoints] = useState(null);

  useEffect(() => {
    if (!user && !isLoading) {
      setUserWithPicks(null);
      router.push("/login");
      return null;
    }

    if (user && !userWithPicks) {
      axios
        .get(`/api/get-user/${user?.email}?week=${currentRound.round}`)
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

  const lastRoundDetails = useMemo(() => {
    if (userWithPicks && userWithPicks.picks.length) {
      return userWithPicks.picks.sort((a, b) => b.week - a.week)[0];
    }
    return {};
    return 0;
  }, [userWithPicks, userWithPicks?.picks]);

  if (loading || isLoading || !currentWeekWithLiveResults) {
    return <CircularProgress />;
  }

  const assignPoints = () => {
    axios
      .post(`/api/assign-points?week=${currentWeekWithLiveResults.week}`, {
        raceResults: currentWeekWithLiveResults,
      })
      .then((res) => {
        console.log({ res: res.data });
        if (res.data.success) {
          setAssignedPoints(res.data);
        }
      })
      .catch((e) => console.warn("ERROR", { e }));
  };
  console.log({ currentWeekWithLiveResults });
  return (
    <HomeStyled currentMode={currentMode}>
      {user.name === process.env.ADMIN_USER && (
        <Button label="Assign Points" onClick={assignPoints} />
      )}
      <div className="user-details">
        <h1>{`Current Round: ${currentWeekWithLiveResults.week}`}</h1>
        <h2>{`Last Round Score: ${lastRoundDetails.totalPoints}`}</h2>
        <h2>{`Last Round Rank: ${lastRoundDetails.rank}`}</h2>
      </div>
      {!currentWeekWithLiveResults.message &&
      currentWeekWithLiveResults.liveResults.fastestLaps &&
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
