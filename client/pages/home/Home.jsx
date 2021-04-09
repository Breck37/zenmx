import React, { useEffect, useState } from "react";
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
  const { raceResults, fastestLaps } = useRaceResults();
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useUser();
  const [userWithPicks, setUserWithPicks] = useState(null);
  const router = useRouter();
  let isMounted = false;

  useEffect(() => {
    if (!user && !isLoading) {
      setUserWithPicks(null);
      router.push("/login");
      return null;
    }

    if (user && !userWithPicks) {
      axios
        .get(`/api/get-user/${user?.email}`)
        .then(
          axios.spread(({ data: userData }, { data: lapData }) => {
            console.log({ lapData });
            if (userData.success) {
              setUserWithPicks(userData.user);
            }

            setFastestLaps(lapData.fastestLaps);
            setTimeout(() => {
              setLoading(false);
            }, 200);
          })
        )
        .catch((e) => console.log("E on Results", e));
      return;
    }
    return () => {
      isMounted = true;
    };
  }, [raceResults, user, isMounted]);

  if (loading || isLoading) {
    return <CircularProgress />;
  }

  const assignPoints = () => {
    console.log(raceResults);
    axios
      .post(`/api/assign-points?week=${currentRound.week}`, { raceResults })
      .then((res) => {
        console.log({ res: res.data });
      })
      .catch((e) => console.warn("ERROR", { e }));
  };

  return (
    <HomeStyled currentMode={currentMode}>
      {user.name === process.env.ADMIN_USER && (
        <Button label="Assign Points" onClick={assignPoints} />
      )}
      {fastestLaps && fastestLaps.length > 0 ? (
        <div className="marquee">
          <div className="animation-container">
            <span>FAST LAPS</span>
            {fastestLaps.map(({ rider, lap, bike }, index) => {
              return (
                <div key={`${rider}-fast-lap`} className={`fast-lap ${index}`}>
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
        </div>
      ) : null}
      <main>
        <h1 className="title"></h1>
      </main>
    </HomeStyled>
  );
};

export default Home;
