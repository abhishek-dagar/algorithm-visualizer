import Link from "next/link";
import Image from "next/image";
import { classes } from "common/util";
import { connect } from "react-redux";
import { actions } from "reducers";
import styles from "./styles.module.scss";
import {
  faHome,
  faChartBar,
  faFileAlt,
  faInfoCircle,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "assets/Viz_Icon.png";
import Router from "next/router";
import { useRouter } from "next/router";

const NavBar = (props) => {
  const opt = ["Home", "Algorithms", "Docs", "About"];
  const icon = [faHome, faChartBar, faFileAlt, faInfoCircle];
  const links = [
    "/",
    {
      pathname: "/Algo-visual",
    },
    "/documentation/GetStarted/Introduction",
    "/about",
  ];
  const location = useRouter();
  let activeLink = props.current.currentTab;
  if (
    location.pathname.split("/")[1] === "" &&
    (activeLink !== 0 || activeLink === 0)
  ) {
    activeLink = 0;
  } else if (
    location.pathname.split("/")[1] === links[1].pathname.split("/")[1] &&
    (activeLink !== 1 || activeLink === 1)
  ) {
    activeLink = 1;
  } else if (
    location.pathname.split("/")[1] === links[2].split("/")[1] &&
    (activeLink !== 2 || activeLink === 2)
  ) {
    activeLink = 2;
  } else if (
    location.pathname.split("/")[1] === links[3].split("/")[1] &&
    (activeLink !== 3 || activeLink === 3)
  ) {
    activeLink = 3;
  } else {
    activeLink = -1;
  }
  const changeActivelink = (n, path) => {
    Router.push(path);
    props.setCurrentNavTab(n);
  };
  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.logoContainer}>
          <Link href="/" onClick={() => changeActivelink(0)}>
            <a className={styles.Icon}>
              <div className={styles.logo}>
                <Image className={styles.image} src={Logo} alt="AV"></Image>
              </div>
            </a>
          </Link>
        </div>
        <div className={styles.navigationButtons}>
          <ul className={styles.navigationOptions}>
            {icon.map((iconName, i) => {
              return (
                <Link href={links[i]} key={i}>
                  <a
                    className={activeLink === i ? styles.activeA : undefined}
                    onClick={() => changeActivelink(i, links[i])}
                  >
                    {activeLink === i ? (
                      <div className={styles.indicator}></div>
                    ) : (
                      <div className={styles.unactiveBar}></div>
                    )}
                    <li className={classes(styles.navigationOption)}>
                      <FontAwesomeIcon
                        className={classes(styles.nav_caret)}
                        fixedWidth
                        icon={iconName}
                      />
                    </li>
                    <span
                      className={classes(
                        styles.tooltip,
                        activeLink === i ? styles.activeTitle : undefined
                      )}
                    >
                      {opt[i]}
                    </span>
                  </a>
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
export default connect(({ current }) => ({ current }), actions)(NavBar);
