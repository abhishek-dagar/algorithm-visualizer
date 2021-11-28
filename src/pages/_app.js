import "styles/globals.scss";
import Navbar from "Navbar";
import styles from "styles/main.module.scss";
import * as reducers from "reducers";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { useEffect } from "react";
import Head from "next/head";

const store = createStore(combineReducers({ ...reducers }));
function MyApp({ Component, pageProps }) {
  let height = 1920;
  let width = 1080;
  if (typeof window !== "undefined") {
    height = window.screen.height;
    width = window.screen.width;
  }
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
        <title>Algorithm Visualizer</title>
      </Head>
      {height && height <= 912 && width && width <= 454 ? (
        <h1>This site is not available for phone</h1>
      ) : (
        <Provider store={store}>
          <div className={styles.mainContainer}>
            <Navbar />
            <div className={styles.ComponentContainer}>
              <Component {...pageProps} />
            </div>
          </div>
        </Provider>
      )}
    </>
  );
}

export default MyApp;
