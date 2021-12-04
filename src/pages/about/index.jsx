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
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime molestiae cum aut sed dicta esse fugiat similique officia minus ut rerum.",
        photo: user,
      },
      {
        key: 2,
        name: "Anubhav Verma",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime molestiae cum aut sed dicta esse fugiat similique officia minus ut rerum.",
        photo: user,
      },
    ];
    return (
      <>
        <div className={styles.mainContainer}>
          <h1 className={styles.title}>
            <strong>Our Team</strong>
          </h1>
          <div className={styles.details}>
            Individual commitment to a group effort--that is what makes a team
            work, a company work, a society work, a civilization work.
          </div>
          <div className={styles.backGround}>
            {info.map((us) => {
              return <Card key={us.key} info={us} />;
            })}
          </div>
        </div>
      </>
    );
  }
}
