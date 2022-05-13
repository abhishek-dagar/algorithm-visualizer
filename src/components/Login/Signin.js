import React, { useState } from "react";
import { classes } from "common/util";
import styles from "./SignIn.module.scss";
import { userApi } from "apis";
import Router from "next/router";

const SignIn = (props) => {
  const [creads, setcreads] = useState({ email: "", password: "" });
  const [showError, setshowError] = useState("");
  const handleError = (error) => {
    if (error.response) {
      const { data, statusText } = error.response;
      let message = data
        ? typeof data === "string"
          ? data
          : JSON.stringify(data)
        : statusText;
      console.error(message);
      setshowError(message);
    } else {
      console.error(error.message);
    }
  };
  const userSignIn = (e) => {
    e.preventDefault();
    userApi
      .signIn(creads)
      .then(({ message, userToken }) => {
        setshowError(message + " " + userToken);
        Router.push("/profile");
        localStorage.setItem("userToken", userToken);
        props.closePopup();
        props.controlLogin(true);
        setcreads({ email: "", password: "" });
      })
      .catch(handleError);
  };

  const onchange = (e) => {
    setcreads({ ...creads, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes(props.className, styles.Form)}>
      <form onSubmit={userSignIn} autoComplete="off">
        <div className={styles.row}>
          <label>Email</label>
          <input
            className={classes(styles.InpurField)}
            type="text"
            name="email"
            value={creads.email}
            onChange={onchange}
            placeholder={"Enter your Email"}
          />
        </div>
        <div className={styles.row}>
          <label>Password</label>
          <input
            className={classes(styles.InpurField)}
            type="password"
            name="password"
            value={creads.password}
            onChange={onchange}
            placeholder={"Enter your Password"}
          />
        </div>
        {showError}
        <div className={classes(styles.row, styles.verticalrow)}>
          <button>Login</button>
          <button className={styles.cancel} onClick={() => props.closePopup()}>cancel</button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
