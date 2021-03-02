import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useCurrentMode } from "../../hooks/currentMode";
import { HomeStyled } from "../../styles";

const bikeLogos = {
  honda: "/logos/HondaLogo.jpeg",
  kawasaki: "/logos/KawiLogo.jpeg",
  husqvarna: "/logos/HuskieLogo.jpeg",
  yamaha: "/logos/YamahaLogo.jpeg",
  gasgas: "/logos/GasGasLogo.jpeg",
  ktm: "/logos/KTMLogo.jpeg",
  suzuki: "/logos/SuzukiLogo.jpeg",
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [raceResults, setResults] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const { currentMode } = useCurrentMode();
  const { user, isLoading } = useUser();
  const router = useRouter();
  let isMounted = false;

  useEffect(() => {
    if (!user && !isLoading) {
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
                    src={bikeLogos[bike.toLowerCase()]}
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
