import React, { Component } from "react";
import styles from "styles/about.module.scss";
import { Card } from "components";
import user from "assets/homePage-removebg-preview.png";

export default class About extends Component {
  render() {
    const info = [
      {
        key: 1,
        name: "Abhishek Dagar",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fuga vel labore.",
        photo: user,
      },
      {
        key: 2,
        name: "Anubhav Verma",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum fuga vel labore.",
        photo: user,
      },
    ];
    return (
      <>
        <div className={styles.mainContainer}>
          <div className={styles.backGround}>
            <h1 className={styles.title}>
              <strong>About Us</strong>
            </h1>
            {info.map((us) => {
              return <Card key={us.key} info={us} />;
            })}
          </div>
        </div>
      </>
    );
  }
}
