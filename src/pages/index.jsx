import Link from "next/link";
import Image from "next/image";
import HomeImg from "assets/homePage-removebg-preview.png";
import SS from "assets/screenshot.png";
import styles from "styles/Home.module.scss";
import { bgImg } from "assets";

import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className={styles.mainContainer}>
          <div className={styles.BgImage}>
            <Image className={styles.image} src={bgImg} alt="" />
          </div>
          <div className={styles.container}>
            <h1 className={styles.title}>
              <strong>Algorithm Visualizer</strong>
            </h1>
            <div className={styles.textContainer}>
              <h1>
                Learn Algorithms with <strong>Algorithm Visualizer</strong>
              </h1>
              <h2>We are Team of Developers</h2>
              <Link href="/Algo-visual">
                <a>Get Started</a>
              </Link>
            </div>
            {/* <div className={styles.imageContainer}>
            <Image className={styles.image} src={HomeImg} alt="Home" />
          </div> */}
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
