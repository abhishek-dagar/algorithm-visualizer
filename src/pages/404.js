import React from "react";
import styles from "styles/error.module.scss";

const E404 = () => {
  return (
    <div className={styles.ErrorPageContainer}>
      <h1 className={styles.mainTitle}>404</h1>
      <div className={styles.cloak__wrapper}>
        <div className={styles.cloak__container}>
          <div className={styles.cloak}></div>
        </div>
      </div>
      <div className={styles.info}>
        <h2>We can&apos;t find that page</h2>
        <p>
          We&apos;re fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it&apos;s behalf.
        </p>
      </div>
    </div>
  );
};
export default E404;