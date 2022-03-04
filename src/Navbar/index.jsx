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
  faBars,
  faTimes,
  // faSun,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "assets/logo.png";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const NavBar = (props) => {
  const opt = ["Home", "Algorithms", "Docs", "About"];
  const icon = [faHome, faChartBar, faFileAlt, faInfoCircle];
  const [OpenNav, setOpenNav] = useState(false);
  const [MenuBtn, setMenuBtn] = useState(faBars);
  const wrapperRef = [];
  const { Theme } = props.Theme;
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
  const NavBaropenclose = () => {
    setOpenNav(!OpenNav);
    if (!OpenNav) {
      setMenuBtn(faTimes);
    } else {
      setMenuBtn(faBars);
    }
  };
  const handleclickoutside = (event) => {
    wrapperRef.forEach((Ref) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        setOpenNav(false);
        setMenuBtn(faBars);
      }
    });
  };

  const ThemeChange = () => {
    const { Theme } = props.Theme;
    if (Theme === "Light") {
      props.setTheme("Dark");
    }
    if (Theme === "Dark") {
      props.setTheme("Light");
    }
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
  return (
    <>
      <nav
        className={classes(
          props.className,
          OpenNav ? styles.openNav : styles.closeNav,
          styles.navigation,
          Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight
        )}
        ref={customref}
      >
        <div className={styles.logoContainer}>
          <div className={styles.Icon}>
            <div className={styles.logo}>
              {/* <Image className={styles.image} onClick={() => NavBaropenclose()} src={Logo} alt="AV"></Image> */}
              <FontAwesomeIcon
                className={classes(styles.image)}
                fixedWidth
                onClick={() => NavBaropenclose()}
                icon={MenuBtn}
              />
            </div>
          </div>
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
        {/* <div className={classes(styles.ThemeBtn)}>
          <FontAwesomeIcon
            className={classes(styles.Btn)}
            fixedWidth
            onClick={() => ThemeChange()}
            icon={faSun}
          />
        </div> */}
      </nav>
    </>
  );
};
export default connect(
  ({ current, Theme }) => ({ current, Theme }),
  actions
)(NavBar);
