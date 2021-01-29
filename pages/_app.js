// import App from 'next/app'
import React from "react";
import { Header } from "../components";
import defaultTabs from "../constants/defaultTabs";

function MyApp({ Component, pageProps }) {
  console.log("HIT MY APP", Component);
  return (
    <>
      <Header tabs={defaultTabs} />
      <Component {...pageProps} />
    </>
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
