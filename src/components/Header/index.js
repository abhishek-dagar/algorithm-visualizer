import React from "react";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
import AutosizeInput from "react-input-autosize";

class Header extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      fullscreenIcon: faExpand,
    };
  }
  handleChangeTitle(e) {
    const { value } = e.target;
    // let titles=[value,undefined];
    this.props.modifyTitle(value);
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

  render() {
    const { className, onClickTitleBar, navigatorOpened, navigator } =
      this.props;
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
            <Button
              className={styles.title_bar}
              onClick={navigator ? onClickTitleBar : () => {}}
            >
              {this.props.newFile ? (
                <AutosizeInput
                  className={styles.input_title}
                  value={titles[0]}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => this.handleChangeTitle(e)}
                />
              ) : (
                titles.map((title, i) => [
                  <Ellipsis key={`title-${i}`}>{title}</Ellipsis>,
                  i < titles.length - 1 && (
                    <FontAwesomeIcon
                      className={styles.nav_arrow}
                      fixedWidth
                      icon={faAngleRight}
                      key={`arrow-${i}`}
                    />
                  ),
                ])
              )}
              {navigator ? (
                <FontAwesomeIcon
                  className={styles.nav_caret}
                  fixedWidth
                  icon={navigatorOpened ? faCaretDown : faCaretRight}
                />
              ) : (
                <></>
              )}
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
