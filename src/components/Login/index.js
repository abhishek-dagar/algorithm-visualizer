import React, { useState } from "react";
import { connect } from "react-redux";
import { actions } from "reducers";
import styles from "./LoginCard.module.scss";
import { classes } from "common/util";
import SignIn from "./Signin";
import SignUp from "./Signup";

const LoginCard = (props) => {
  const { Theme } = props.Theme;
  const [isSignIn, setisSignIn] = useState(true);
  return (
    <div
      className={classes(
        styles.LoginCard,
        !isSignIn ? styles.formSignUp : styles.formSignIn,
        Theme === "Light"
          ? styles.containerLight
          : Theme === "Dark"
          ? styles.containerDark
          : styles.containerLight
      )}
    >
      <div className={styles.TopBox}>
        <div className={styles.title}>Welcome</div>
      </div>
      <div className={styles.LoginBox}>
        <div className={styles.BtnsBox}>
          <div
            className={classes(
              isSignIn ? styles.active : styles.inactive,
              styles.BoxBtn
            )}
            onClick={() => setisSignIn(true)}
          >
            SignIn
          </div>
          <div
            className={classes(
              styles.BoxBtn,
              !isSignIn ? styles.active : styles.inactive
            )}
            onClick={() => setisSignIn(false)}
          >
            SignUp
          </div>
        </div>
        {isSignIn ? (
          <SignIn
            className={styles.FormContainer}
            closePopup={props.closePopup}
          />
        ) : (
          <SignUp
            className={styles.FormContainer}
            closePopup={props.closePopup}
          />
        )}
      </div>
    </div>
  );
};
export default connect(({ Theme }) => ({ Theme }), actions)(LoginCard);
