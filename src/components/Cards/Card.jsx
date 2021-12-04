import React from "react";
import styles from "./Card.module.scss";
import Link from "next/link";
import Image from "next/image";
import {
  faFacebook,
  faGithub,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/fontawesome-free-brands";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Card = (props) => {
  const { name, description, photo } = props.info;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.coverPhoto}>
          <div className={styles.profile}>
            <FontAwesomeIcon
              className={styles.nav_caret}
              fixedWidth
              icon={faUser}
            />
            {/* <Image src={photo} alt="Abhishek"></Image> */}
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.profileName}>{name}</div>
          <p className={styles.about}>{description}</p>
          <div className={styles.socialButton}>
            <Link href={"/about"}>
              <a>
                <FontAwesomeIcon
                  className={styles.nav_caret}
                  fixedWidth
                  icon={faFacebook}
                />
              </a>
            </Link>
            <Link href={"/about"}>
              <a>
                <FontAwesomeIcon
                  className={styles.nav_caret}
                  fixedWidth
                  icon={faGithub}
                />
              </a>
            </Link>
            <Link href={"/about"}>
              <a>
                <FontAwesomeIcon
                  className={styles.nav_caret}
                  fixedWidth
                  icon={faLinkedinIn}
                />
              </a>
            </Link>
            <Link href={"/about"}>
              <a>
                <FontAwesomeIcon
                  className={styles.nav_caret}
                  fixedWidth
                  icon={faInstagram}
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
