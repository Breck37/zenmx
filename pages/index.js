import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table, Header } from "../components";
import { IndexStyled } from './IndexStyled'
      <Header tabs={defaultTabs} />
import defaultTabs from '../constants/defaultTabs';

// SETUP POLLING
// SETUP AUTHENTICATION
// SETUP PICK UI
// SETUP TEAM UI
// SETUP LEAGUE UI

///// EXAMPLES ////
// PDF:  .get("http://localhost:3700/pdf-results/20/20/1")

/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function Home() {
  const [raceResults, setResults] = useState([]);
  const [seasonResults, setSeasonResults] = useState([]);

  useEffect(() => {
    if (!raceResults || !raceResults.length) {
      axios
        .get("http://localhost:3700/get-live-results")
        .then(({ data }) => {
          setResults(data.raceResults);
        })
        .catch((e) => console.log("E on Results", e));
      return;
    }
  }, [raceResults]);

  const fastestLaps = useMemo(() => {
    if (!raceResults || !raceResults.length) return [];
    return raceResults
      .sort((a, b) => a.bestLap - b.bestLap)
      .reduce((a, c) => {
        a.push({ rider: c.riderName.trim(), lap: c.bestLap });
        return a;
      }, []);
  }, [raceResults]);

  const getCurrentStatus = () => {
    axios
      .get("http://localhost:3700/current-status")
      .then((r) => console.log("RESPONSE IN CLIENT", r))
      .catch((e) => console.log(e));
  };

  return (
    <IndexStyled>
      <Head>
        <title>ModernMotoFantasy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      {fastestLaps && fastestLaps.length > 0 ? (
        <div className="marquee">
          <div className="animation-container">
            {fastestLaps.map(({ rider, lap }) => (
              <div className="fast-lap">
                <img src="" alt="" className="rider-image" />
                <div>{rider}:</div>
                <div>{lap}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">Modern Moto Fantasy</a>
        </h1>

        <h1 className="title">
          Fastest Lap: {fastestLaps[0]?.rider} {fastestLaps[0]?.lap}
        </h1>

        <button onClick={getCurrentStatus}>Click for status</button>

        {raceResults && raceResults.length ? (
          <Table raceResults={raceResults} />
        ) : null}
      </main>

      {/* <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer> */}
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
