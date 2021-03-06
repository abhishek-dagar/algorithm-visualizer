import React from "react";
import { classes } from "common/util";
import styles from "./ProgressBar.module.scss";
import { connect } from "react-redux";
import { actions } from "reducers";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e) {
    this.target = e.target;
    this.handleMouseMove(e);
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseMove(e) {
    const { left } = this.target.getBoundingClientRect();
    const { offsetWidth } = this.target;
    const { onChangeProgress } = this.props;
    const progress = (e.clientX - left) / offsetWidth;
    if (onChangeProgress) onChangeProgress(progress);
  }

  handleMouseUp(e) {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    const { className, total, current } = this.props;
    const { Theme } = this.props.Theme;
    const width = (current / total) * 100;
    if (width === "NaN") {
      width = 100;
    }
    return (
      <div
        className={classes(
          styles.progress_bar,
          Theme === "Light"
            ? styles.ProgressBarLight
            : Theme === "Dark"
            ? styles.ProgressBarDark
            : styles.ProgressBarLight,
          className
        )}
        onMouseDown={this.handleMouseDown}
      >
        <div className={styles.active} style={{ width: `${width}%` }} />
        <div className={styles.label}>
          <span className={styles.current}>{current}</span> / {total}
        </div>
      </div>
    );
  }
}

export default connect(({ Theme }) => ({ Theme }), actions)(ProgressBar);
