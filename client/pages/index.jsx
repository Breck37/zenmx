import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import axios from "axios";
import { useCurrentMode } from "../hooks/currentMode";
import { IndexStyled, LoginStyled } from "../styles";
import CircularProgress from "@material-ui/core/CircularProgress";

///// EXAMPLES ////
/// NEED TO LOOK AT https://live.amasupercross.com/xml/sx/RaceData.json WHILE RACE IS HAPPENING

export default function LandingPage({ setCurrentMode }) {
  const [loading, setLoading] = useState(true);
  const { currentMode } = useCurrentMode();
  const { user } = useUser();
  const router = useRouter();

  if (user) {
    router.push("/home");
    return null;
  }

  const getCurrentStatus = () => {
    axios
      .get("http://localhost:3700/current-status")
      .then((r) => console.log("RESPONSE IN CLIENT", r))
      .catch((e) => console.log(e));
  };

  return (
    <IndexStyled currentMode={currentMode}>
      <div className="mode-container">
        <button onClick={() => setCurrentMode(!currentMode)}>
          Go {currentMode ? "Dark" : "Bright"}
        </button>
      </div>

      <LoginStyled isDarkMode={currentMode}>
        <div className="title">
          <span>Modern</span>
          <span>Moto</span>
        </div>
        <div className="tagline">
          <i>The</i> MX fantasy app
        </div>
        <a className="login-button" href="/api/auth/login">
          Login
        </a>
      </LoginStyled>
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
