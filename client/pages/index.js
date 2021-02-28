import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { IndexStyled, LoadingStyled } from "../styles";
import { useCurrentMode } from "../hooks/currentMode";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const bikeLogos = {
  honda: "/logos/HondaLogo.jpeg",
  kawasaki: "/logos/KawiLogo.jpeg",
  husqvarna: "/logos/HuskieLogo.jpeg",
  yamaha: "/logos/YamahaLogo.jpeg",
  gasgas: "/logos/GasGasLogo.jpeg",
  ktm: "/logos/KTMLogo.jpeg",
  suzuki: "/logos/SuzukiLogo.jpeg",
};

///// EXAMPLES ////
/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function Home() {
  const [raceResults, setResults] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentMode } = useCurrentMode();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (user && (!raceResults || !raceResults.length)) {
      axios
        .all([
          axios.get(`/api/get-user/${user?.email}`),
          axios.get("/api/get-live-results"),
        ])
        .then(
          axios.spread(({ data: userData }, { data }) => {
            console.log(userData);
            if (userData.success === false) {
              router.push("/login");
            }
            setResults(data.raceResults);
            setFastestLaps(data.fastestLaps);
            setTimeout(() => setLoading(false), 4300);
          })
        )
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [raceResults]);

  if (loading) {
    return (
      <LoadingStyled>
        <div className="top">
          <span>Modern</span>
        </div>
        <div className="bottom">
          <span className="backwards">Moto</span>
        </div>
      </LoadingStyled>
    );
  }

  const getCurrentStatus = () => {
    axios
      .get("http://localhost:3700/current-status")
      .then((r) => console.log("RESPONSE IN CLIENT", r))
      .catch((e) => console.log(e));
  };

  return (
    <IndexStyled currentMode={currentMode}>
      <Head>
        <title>ModernMotoFantasy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

        {/* <button onClick={getCurrentStatus}>Click for status</button> */}
      </main>
    </IndexStyled>
  );
}

<style jsx global>{`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`}</style>;
