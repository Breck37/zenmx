import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Table } from "../components/Results";
import styled from "styled-components";

// NEEDS

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
    <IndexStyled className="container">
      <Head>
        <title>ModernMotoFantasy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
      <main>
        <h1 className="title">
          Welcome to <a href="https://nextjs.org">ZenMx</a>
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

const IndexStyled = styled.div`
  margin: 0;

  .container {
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  main {
    width: 75%;
    margin: 0 auto;
    min-height: 100vh;
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .marquee {
    height: 100px;
    background-color: aqua;
    width: 200%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .animation-container {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    // animation: scroll 25s linear infinite;
    width: 210%;
  }

  @keyframes scroll {
    0% {
      -moz-transform: translateX(100%);
      -webkit-transform: translateX(100%);
      transform: translateX(100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      -moz-transform: translateX(-100%);
      -webkit-transform: translateX(-100%);
      transform: translateX(-100%);
    }
  }

  .fast-lap {
    // -moz-animation: scroll 600s linear infinite;
    // -webkit-animation: scroll 600s linear infinite;
    // animation: scroll 30s linear infinite;
    height: 65px;
    width: 250px;
    margin-right: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
  }

  .rider-image {
    background-color: #000;
    height: 100%;
    width: 65px;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer img {
    margin-left: 0.5rem;
  }

  footer a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .title a {
    color: #0070f3;
    text-decoration: none;
  }

  .title a:hover,
  .title a:focus,
  .title a:active {
    text-decoration: underline;
  }

  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
  }

  .title,
  .description {
    text-align: center;
  }

  .description {
    line-height: 1.5;
    font-size: 1.5rem;
  }

  code {
    background: #fafafa;
    border-radius: 5px;
    padding: 0.75rem;
    font-size: 1.1rem;
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
      DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  }

  .grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    max-width: 800px;
    margin-top: 3rem;
  }

  .card {
    margin: 1rem;
    flex-basis: 45%;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .card:hover,
  .card:focus,
  .card:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  .card h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .card p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  .logo {
    height: 1em;
  }

  @media (max-width: 600px) {
    .grid {
      width: 100%;
      flex-direction: column;
    }
  }
`;

<style jsx global>{``}</style>;
