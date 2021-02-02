import Head from "next/head";
import { useState, useEffect } from "react";
import axios from "axios";
import { IndexStyled } from "./styles";
import { useCurrentMode } from "../hooks/darkMode";

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
// PDF:  .get("http://localhost:3700/pdf-results/20/20/1")
/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function Home() {
  const [raceResults, setResults] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const { currentMode } = useCurrentMode();

  useEffect(() => {
    if (!raceResults || !raceResults.length) {
      axios
        .get("/api/get-live-results")
        .then(({ data }) => {
          console.log({ data });
          setResults(data.raceResults);
          setFastestLaps(data.fastestLaps);
        })
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [raceResults]);

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

        <button onClick={getCurrentStatus}>Click for status</button>
      </main>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </IndexStyled>
  );
}

<style jsx global>{``}</style>;
