// import App from 'next/app'
import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { CurrentModeContext } from "../hooks";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";
import { AppStyled } from "../styles";
import { useRouter } from "next/router";
import "../styles/fonts.css";

function ModernMotoFantasy({ Component, pageProps }) {
  const [currentMode, setCurrentMode] = useState();
  const router = useRouter();

  const isLoginOrLandingPage = useMemo(() => {
    return Boolean(router.pathname === "/login" || router.pathname === "/");
  }, [router.pathname]);

  useEffect(() => {
    const mode = localStorage.getItem("USER_CURRENT_MODE");

    if (!mode && mode !== 0 && mode !== 1) {
      localStorage.setItem("USER_CURRENT_MODE", 1);
      setCurrentMode(1);
    } else {
      setCurrentMode(parseInt(localStorage.getItem("USER_CURRENT_MODE")));
    }
  }, []);

  const handleCurrentModeUpdate = () => {
    const currentMode = localStorage.getItem("USER_CURRENT_MODE");

    const modeToSet = parseInt(currentMode) ? 0 : 1;

    setCurrentMode(modeToSet);
    localStorage.setItem("USER_CURRENT_MODE", modeToSet);
  };

  return (
    <UserProvider>
      <AppStyled currentMode={currentMode}>
        <Head>
          <title>ModernMotoFantasy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CurrentModeContext.Provider value={currentMode}>
          {!isLoginOrLandingPage && (
            <Header
              tabs={defaultTabs}
              currentMode={currentMode}
              setCurrentMode={handleCurrentModeUpdate}
            />
          )}
          <Component {...pageProps} setCurrentMode={handleCurrentModeUpdate} />
        </CurrentModeContext.Provider>
      </AppStyled>
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
