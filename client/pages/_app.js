// import App from 'next/app'
import React, { useState, useEffect } from "react";
import { CurrentModeContext } from "../hooks";
import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";
import { AppStyled } from "./styles";
import { Router } from "next/router";

function ModernMotoFantasy({ Component, pageProps }) {
  const [currentMode, setCurrentMode] = useState();
  const { user, error, isLoading } = useUser();
  console.log({
    user,
    error,
    isLoading,
  });

  useEffect(() => {
    const mode = localStorage.getItem("USER_CURRENT_MODE");

    if (!mode && mode !== 0 && mode !== 1) {
      localStorage.setItem("USER_CURRENT_MODE", 1);
      setCurrentMode(1);
    } else {
      setCurrentMode(parseInt(localStorage.getItem("USER_CURRENT_MODE")));
    }
  }, []);

  if (!user) Router.push("/login");

  const handleCurrentModeUpdate = () => {
    const currentMode = localStorage.getItem("USER_CURRENT_MODE");

    const modeToSet = parseInt(currentMode) ? 0 : 1;

    setCurrentMode(modeToSet);
    localStorage.setItem("USER_CURRENT_MODE", modeToSet);
  };

  return (
    <UserProvider>
      <CurrentModeContext.Provider value={currentMode}>
        <AppStyled currentMode={currentMode}>
          <Header
            tabs={defaultTabs}
            currentMode={currentMode}
            setCurrentMode={handleCurrentModeUpdate}
          />
          <Component {...pageProps} />
        </AppStyled>
      </CurrentModeContext.Provider>
    </UserProvider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// ModernMotoFantasy.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default ModernMotoFantasy;
