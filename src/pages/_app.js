import "styles/globals.scss";
import "styles/progress.css";
import Navbar from "Navbar";
import styles from "styles/main.module.scss";
import * as reducers from "reducers";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { useEffect } from "react";
import Head from "next/head";
import nProgress from "nprogress";
import Router from "next/router";

nProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = (url) => {
  nProgress.start();
};

Router.onRouteChangeComplete = () => nProgress.done();
Router.onRouteChangeError = () => nProgress.done();

const store = createStore(combineReducers({ ...reducers }));
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/api/tracers/js")
        .catch((err) =>
          console.error("Service worker registration failed", err)
        );
    } else {
      console.log("Service worker not supported");
    }
  }, []);
  return (
    <>
      <Head>
        <title>GeeksPoint</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Provider store={store}>
        <div className={styles.mainContainer}>
          <Navbar className={styles.navBar}/>
          <div className={styles.fakeNav}>hel</div>
          <div className={styles.ComponentContainer}>
            <Component {...pageProps} />
          </div>
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
