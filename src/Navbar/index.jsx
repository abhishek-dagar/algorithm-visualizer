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
  faSun,
  faMoon,
  faCode,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Logo from "assets/logo.png";
import Router from "next/router";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { UserMenu } from "components";

const NavBar = (props) => {
  const opt = ["Home", "Algorithms", "Docs", "About", "CodeSpace"];
  const icon = [faHome, faChartBar, faFileAlt, faInfoCircle, faCode];
  const userAvatar = [
    "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    "https://cdn-icons-png.flaticon.com/512/4333/4333609.png",
  ];
  const [userToken, setuserToken] = useState(undefined);
  const [OpenNav, setOpenNav] = useState(false);
  const [dropdownVisible, setdropdownVisible] = useState(false);
  const [MenuBtn, setMenuBtn] = useState(faBars);
  const [ThemeBtn, setThemeBtn] = useState(faSun);
  const wrapperRef = [];
  const { Theme } = props.Theme;
  const links = [
    "/",
    {
      pathname: "/Algo-visual",
    },
    "/documentation/GetStarted/Introduction",
    "/about",
    "/CodeSpace",
  ];
  const location = useRouter();
  let activeLink = props.current.currentTab;
  if (
    (location.pathname.split("/")[1] === "" ||
      location.pathname.split("/")[1] === "profile") &&
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
  } else if (
    location.pathname.split("/")[1] === links[4].split("/")[1] &&
    (activeLink !== 4 || activeLink === 4)
  ) {
    activeLink = 4;
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

  const handleDropDown = () => {
    setdropdownVisible(!dropdownVisible);
  };

  const ThemeChange = () => {
    const { Theme } = props.Theme;
    if (Theme === "Light") {
      props.setTheme("Dark");
      setThemeBtn(faSun);
    }
    if (Theme === "Dark") {
      props.setTheme("Light");
      setThemeBtn(faMoon);
    }
  };

  const customref = (refernce) => {
    wrapperRef.push({ current: refernce });
  };
  useEffect(() => {
    const Theme = localStorage.getItem("Theme");
    setuserToken(localStorage.getItem("userToken"));
    if (Theme == null) {
      props.setTheme("Dark");
    } else {
      props.setTheme(Theme);
      if (Theme === "Light") {
        setThemeBtn(faMoon);
      }
      if (Theme === "Dark") {
        setThemeBtn(faSun);
      }
    }
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
              if (i === 4 && !props.LoggedIn) {
                return <div key={i}></div>;
              }
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
        <div className={styles.mainDropdown}>
          <div className={classes(styles.profileBtn)}>
            <img
              src={userToken ? userAvatar[1] : userAvatar[0]}
              alt=""
              onClick={handleDropDown}
            />
          </div>
          {dropdownVisible ? (
            <UserMenu
              handleDropDown={handleDropDown}
              LoggedIn={props.LoggedIn}
            />
          ) : (
            <></>
          )}
        </div>
      </nav>
      <div className={classes(styles.ThemeBtn)}>
        <FontAwesomeIcon
          className={classes(styles.Btn)}
          fixedWidth
          onClick={() => ThemeChange()}
          icon={ThemeBtn}
        />
      </div>
    </>
  );
};
export default connect(
  ({ current, Theme }) => ({ current, Theme }),
  actions
)(NavBar);
