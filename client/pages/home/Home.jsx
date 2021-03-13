import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useCurrentMode } from "../../hooks/currentMode";
import { HomeStyled } from "../../styles";
import { manufacturers } from "../../constants";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [raceResults, setResults] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const { currentMode } = useCurrentMode();
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

    if (user && (!raceResults || !raceResults.length)) {
      axios
        .all([
          axios.get(`/api/get-user/${user?.email}`),
          axios.get("/api/get-live-results"),
        ])
        .then(
          axios.spread(({ data: userData }, { data }) => {
            if (userData.success) setUserWithPicks(userData.user);
            console.log(data);
            setResults(data.raceResults);
            setFastestLaps(data.fastestLaps);
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
  console.log(user, userWithPicks);
  return (
    <HomeStyled currentMode={currentMode}>
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
