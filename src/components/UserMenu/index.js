import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./UserMenu.module.scss";
import { classes } from "common/util";
import Router from "next/router";
import { actions } from "reducers";
import { connect } from "react-redux";
import { faSignOutAlt, faSignInAlt } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserMenu = (props) => {
  const wrapperRef = [];

  const handleclickoutside = (event) => {
    wrapperRef.forEach((Ref) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        props.handleDropDown();
      }
    });
  };

  const customref = (refernce) => {
    wrapperRef.push({ current: refernce });
  };

  useEffect(() => {
    if (typeof document !== undefined) {
      document.addEventListener("click", handleclickoutside);
    }
    return () => {
      document.removeEventListener("click", handleclickoutside);
    };
  }, []);

  const signout = () => {
    localStorage.removeItem("userToken");
    Router.push("/");
    props.handleDropDown();
  };

  return (
    <div className={styles.dropdown} ref={customref}>
      <ul className={styles.navigationOptions}>
        <Link href={"/profile"}>
          <a
            className={classes(
              styles.activeA,
              props.LoggedIn ? styles.enable : styles.disablea
            )}
          >
            <li
              className={classes(
                styles.navigationOption,
                props.LoggedIn ? styles.enable : styles.disableli
              )}
              onClick={props.handleDropDown}
            >
              <span>profile</span>
            </li>
          </a>
        </Link>
        <Link href={"/CodeSpace"}>
          <a
            className={classes(
              styles.activeA,
              props.LoggedIn ? styles.enable : styles.disablea
            )}
            onClick={props.handleDropDown}
          >
            <li
              className={classes(
                styles.navigationOption,
                props.LoggedIn ? styles.enable : styles.disableli
              )}
            >
              <span>Create New File</span>
            </li>
          </a>
        </Link>
        <hr></hr>
        <li className={classes(styles.navigationOption)} onClick={signout}>
          <FontAwesomeIcon
            className={classes(styles.image)}
            fixedWidth
            // onClick={() => NavBaropenclose()}
            icon={props.LoggedIn ? faSignOutAlt : faSignInAlt}
          />
          <span>{props.LoggedIn ? "signout" : "LogIn"}</span>
        </li>
      </ul>
    </div>
  );
};
export default connect(
  ({ current, env, Theme }) => ({ current, env, Theme }),
  actions
)(UserMenu);
