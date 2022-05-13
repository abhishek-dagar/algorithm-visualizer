import React, { useState } from "react";
import { classes } from "common/util";
import styles from "./SignUp.module.scss";
import { userApi } from "apis";
import Router from "next/router";

const SignUp = (props) => {
  const [creads, setcreads] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
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
  const userSignUp = (e) => {
    e.preventDefault();
    if (creads.password == creads.confirm_password) {
      userApi
        .signUp(creads)
        .then(({ message, userToken }) => {
          setshowError(message);
          Router.push("/profile");
          localStorage.setItem("userToken", userToken);
          props.closePopup();
          props.controlLogin(true);
          setcreads({
            username: "",
            email: "",
            password: "",
            confirm_password: "",
          });
        })
        .catch(handleError);
    }
  };
  const onchange = (e) => {
    setcreads({ ...creads, [e.target.name]: e.target.value });
  };
  return (
    <div className={classes(props.className, styles.Form)}>
      <form onSubmit={userSignUp} autoComplete="off">
        <div className={styles.row}>
          <label>Username</label>
          <input
            className={classes(styles.InpurField)}
            type="text"
            name="username"
            value={creads.username}
            onChange={onchange}
            placeholder={"Enter your Username"}
          />
        </div>
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
        <div className={styles.row}>
          <label>Confirm Password</label>
          <input
            className={classes(styles.InpurField)}
            type="password"
            name="confirm_password"
            value={creads.confirm_password}
            onChange={onchange}
            placeholder={"Enter your Password"}
          />
        </div>
        {showError}
        <div className={classes(styles.row, styles.verticalrow)}>
          <button>SignUp</button>
          <button className={styles.cancel} onClick={() => props.closePopup()}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
