import React from "react";
import styles from "./Ellipsis.module.scss";
import { classes } from "common/util";
import { connect } from "react-redux";
import { actions } from "reducers";

class Ellipsis extends React.Component {
  render() {
    const { className, children } = this.props;
    const { Theme } = this.props.Theme;

    return (
      <span
        className={classes(
          styles.ellipsis,
          Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight,
          className
        )}
      >
        {children}
      </span>
    );
  }
}

export default connect(({ Theme }) => ({ Theme }), actions)(Ellipsis);
