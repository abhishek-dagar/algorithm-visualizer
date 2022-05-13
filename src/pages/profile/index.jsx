import React, { Component } from "react";
import styles from "styles/profile.module.scss";
import { classes } from "common/util";

import { ProfileData } from "components";
import Router from "next/router";

export default class profile extends Component {
  signout() {
    localStorage.removeItem("userToken");
    Router.push("/");
  }
  render() {
    return (
      <div className={classes(styles.mainContainer)}>
        <ProfileData />
      </div>
    );
  }
}
