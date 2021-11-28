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
import { languages } from "common/config";
import { BaseComponent, Button, Ellipsis, ListItem, Player } from "..";
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
    const { ext } = this.props.env;

    return (
      <header className={classes(styles.header, className)}>
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
        <div className={styles.row}>
          <div className={styles.section}>
            <Button icon={faSearch} primary onClick={onClickTitleBar}>
              Search Algorithm
            </Button>
            <Button className={styles.btn_dropdown} icon={faStar}>
              {languages.find((language) => language.ext === ext).name}
              <div className={styles.dropdown}>
                {languages.map((language) =>
                  language.ext === ext ? null : (
                    <ListItem
                      key={language.ext}
                      onClick={() => this.props.setExt(language.ext)}
                      label={language.name}
                    />
                  )
                )}
              </div>
            </Button>
          </div>
          <Player className={styles.section} />
        </div>
      </header>
    );
  }
}

export default withRouter(
  connect(({ current, env }) => ({ current, env }), actions)(Header)
);
