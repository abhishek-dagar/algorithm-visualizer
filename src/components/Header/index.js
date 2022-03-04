import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faStar,
  faExpand,
  faCompress,
  faCaretRight,
  faCaretDown,
  faAngleRight,
} from "@fortawesome/fontawesome-free-solid";
import { classes } from "common/util";
import { actions } from "reducers";
import { BaseComponent, Button, Ellipsis } from "..";
import styles from "./Header.module.scss";

class Header extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullscreenIcon: faExpand,
    };
  }
  handleClickFullScreen() {
    if (typeof document !== undefined) {
      if (document.fullscreenEnabled) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          this.setState({ fullscreenIcon: faExpand });
        } else {
          document.documentElement.requestFullscreen();
          this.setState({ fullscreenIcon: faCompress });
        }
      }
    }
  }

  handleChangeTitle(e) {
    const { value } = e.target;
    this.props.modifyTitle(value);
  }

  render() {
    const { className, onClickTitleBar, navigatorOpened } = this.props;
    const { titles } = this.props.current;
    const { fullscreenIcon } = this.state;
    const { Theme } = this.props.Theme;

    return (
      <header
        className={classes(
          styles.header,
          Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight,
          className
        )}
      >
        <div className={classes(styles.row, styles.border)}>
          <div className={classes(styles.section)}>
            <Button className={styles.title_bar} onClick={onClickTitleBar}>
              {titles.map((title, i) => [
                <Ellipsis key={`title-${i}`}>{title}</Ellipsis>,
                i < titles.length - 1 && (
                  <FontAwesomeIcon
                    className={styles.nav_arrow}
                    fixedWidth
                    icon={faAngleRight}
                    key={`arrow-${i}`}
                  />
                ),
              ])}
              <FontAwesomeIcon
                className={styles.nav_caret}
                fixedWidth
                icon={navigatorOpened ? faCaretDown : faCaretRight}
              />
            </Button>
          </div>
          <div className={styles.section}>
            <Button
              icon={fullscreenIcon}
              primary
              onClick={() => this.handleClickFullScreen()}
            >
              Fullscreen
            </Button>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(
  connect(
    ({ current, env, Theme }) => ({ current, env, Theme }),
    actions
  )(Header)
);
