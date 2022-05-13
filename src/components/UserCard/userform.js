import React, { useEffect, useState } from "react";
import styles from "./userfrom.module.scss";
import { classes } from "common/util";
import { userApi } from "apis";

const Userform = (props) => {
  const [creads, setcreads] = useState({
    username: "",
    bio: "",
    Desgnation: "",
    userToken: localStorage.getItem("userToken"),
  });
  const onSubmit = (e) => {
    e.preventDefault();
    userApi.updateUserData(creads);
    props.changeForm();
  };
  const onReset = (e) => {
    e.preventDefault();
    props.changeForm();
  };

  const onchange = (e) => {
    setcreads({ ...creads, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    userApi
      .getUserData({ userToken: localStorage.getItem("userToken") })
      .then(({ userData }) => {
        const username = userData.userInfo.username;
        const bio = userData.userInfo.bio;
        const Desgnation = userData.userInfo.Desgnation;
        setcreads({ ...creads, username, bio, Desgnation });
        // setcreads({ ...creads, userToken: localStorage.getItem("userToken") });
      });
  }, []);

  return (
    <div className={styles.userForm}>
      <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
        <div className={styles.mb2}>
          <label>Username</label>
          <input
            className={classes(styles.NameField, styles.fromControl)}
            type="text"
            name="username"
            placeholder="username"
            aria-label="username"
            value={creads.username}
            onChange={onchange}
          />
        </div>
        <div className={styles.mb2}>
          <label>Desgnation</label>
          <input
            className={classes(styles.NameField, styles.fromControl)}
            type="text"
            name="Desgnation"
            placeholder="Desgnation"
            aria-label="Desgnation"
            value={creads.Desgnation}
            onChange={onchange}
          />
        </div>
        <div className={styles.mb2}>
          <label>Bio</label>
          <textarea
            className={classes(styles.bioField, styles.fromControl)}
            placeholder="Add a bio"
            aria-label="bio"
            name="bio"
            spellCheck={false}
            rows={3}
            data-input-max-length="160"
            value={creads.bio}
            onChange={onchange}
          ></textarea>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" className={styles.btnSubmit}>
            save
          </button>
          <button type="reset" className={styles.btnCancel}>
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Userform;
