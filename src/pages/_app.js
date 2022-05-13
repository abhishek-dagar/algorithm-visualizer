import "styles/globals.scss";
import "styles/progress.css";
import Navbar from "Navbar";
import { LoginCard } from "components";
import styles from "styles/main.module.scss";
import * as reducers from "reducers";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { useEffect, useState } from "react";
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
  const [LoginPopUp, setLoginPopUp] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  const TogglePopup = () => {
    setLoginPopUp(!LoginPopUp);
  };
  const controlLogin = (isLogin) => {
    setLoggedIn(isLogin);
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setLoginPopUp(false);
      setLoggedIn(true);
    } else {
      setTimeout(() => {
        setLoginPopUp(true);
      }, 2000);
    }
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
          <Navbar className={styles.navBar} LoggedIn={LoggedIn} />
          <div className={styles.fakeNav}></div>
          <div className={styles.ComponentContainer}>
            <Component
              openLoginPopUP={TogglePopup}
              LoggedIn={LoggedIn}
              {...pageProps}
            />
          </div>
        </div>
        {LoginPopUp ? (
          <div className={styles.Login}>
            <LoginCard controlLogin={controlLogin} closePopup={TogglePopup} />
          </div>
        ) : (
          <></>
        )}
      </Provider>
    </>
  );
}

export default MyApp;
