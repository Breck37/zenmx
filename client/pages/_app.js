// import App from 'next/app'
import React, { useState } from "react";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";
import { AppStyled } from "./styles";
import CurrentModeContext from "../hooks/darkMode";

function MyApp({ Component, pageProps }) {
  const [currentMode, setCurrentMode] = useState(1);
  return (
    <CurrentModeContext.Provider value={currentMode}>
      <AppStyled>
        <Header
          tabs={defaultTabs}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
        />
        <Component {...pageProps} />
      </AppStyled>
    </CurrentModeContext.Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
