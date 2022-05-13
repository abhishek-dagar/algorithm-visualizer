import Image from "next/image";
import SS from "assets/screenshot.png";
import styles from "styles/Home.module.scss";
import { classes } from "common/util";
import { connect } from "react-redux";
import { actions } from "reducers";
import router from "next/router";

import React, { Component } from "react";

class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      buttonText: "Login",
      bottonLink: "/",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("userToken")) {
      this.setState({buttonText:"Get Started"})
      // router.push("/profile");
    }
  }
  render() {
    const { Theme } = this.props.Theme;
    return (
      <>
        <div
          className={classes(
            styles.mainContainer,
            Theme === "Light"
              ? styles.containerLight
              : Theme === "Dark"
              ? styles.containerDark
              : styles.containerLight
          )}
        >
          <div className={styles.container}>
            <h1 className={styles.title}>
              <strong>Algorithm Visualizer</strong>
            </h1>
            <div className={styles.textContainer}>
              <h1>
                Learn Algorithms with <strong>Algorithm Visualizer</strong>
              </h1>
              <h2>We are Team of Developers</h2>
              <div
                className={styles.Btn}
                onClick={() => this.props.openLoginPopUP()}
              >
                {this.state.buttonText}
              </div>
            </div>
          </div>
          <div className={styles.QuoteContainer}>
            <div className={styles.imageContainer}>
              <Image className={styles.image} src={SS} alt="SS" />
            </div>
            <h2>
              <strong>
                Any fool can write code that a computer can understand. Good
                programmers write code that humans can understand.
              </strong>
            </h2>
          </div>
        </div>
      </>
    );
  }
}
export default connect(({ Theme }) => ({ Theme }), actions)(Home);
