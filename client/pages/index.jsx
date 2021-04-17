import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import axios from "axios";
import { useCurrentMode } from "../hooks/currentMode";
import { IndexStyled, LoginStyled } from "../styles";
import CircularProgress from "@material-ui/core/CircularProgress";

///// EXAMPLES ////
/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function LandingPage({ setCurrentMode }) {
  const { currentMode } = useCurrentMode();
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }

    if (!isLoading && user) {
      router.push("/home");
    }
  }, [isLoading]);

  const getCurrentStatus = () => {
    axios
      .get("http://localhost:3700/current-status")
      .then((r) => console.log("Current Status:", r))
      .catch((e) => console.log(e));
  };

  return (
    <IndexStyled currentMode={currentMode}>
      <div className="mode-container">
        <button onClick={() => setCurrentMode(!currentMode)}>
          Go {currentMode ? "Dark" : "Bright"}
        </button>
      </div>
      <CircularProgress />
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
