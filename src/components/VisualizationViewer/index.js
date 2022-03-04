import React from "react";
import { connect } from "react-redux";
import { BaseComponent } from "..";
import { actions } from "reducers";
import styles from "./VisualizationViewer.module.scss";
import * as TracerClasses from "VisualApp/core/tracers";
import * as LayoutClasses from "VisualApp/core/layouts";
import { classes } from "common/util";
import { ScaleLoader } from "react-spinners";

class VisualizationViewer extends BaseComponent {
  constructor(props) {
    super(props);

    this.reset();
  }

  reset() {
    this.root = null;
    this.objects = {};
  }

  componentDidMount() {
    const { chunks, cursor } = this.props.player;
    this.update(chunks, cursor);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { chunks, cursor } = nextProps.player;
    const { chunks: oldChunks, cursor: oldCursor } = this.props.player;
    if (chunks !== oldChunks || cursor !== oldCursor) {
      this.update(chunks, cursor, oldChunks, oldCursor);
    }
  }

  update(chunks, cursor, oldChunks = [], oldCursor = 0) {
    let applyingChunks;
    if (cursor > oldCursor) {
      applyingChunks = chunks.slice(oldCursor, cursor);
    } else {
      this.reset();
      applyingChunks = chunks.slice(0, cursor);
    }
    applyingChunks.forEach((chunk) => this.applyChunk(chunk));

    const lastChunk = applyingChunks[applyingChunks.length - 1];
    if (lastChunk && lastChunk.lineNumber !== undefined) {
      this.props.setLineIndicator({ lineNumber: lastChunk.lineNumber, cursor });
    } else {
      this.props.setLineIndicator(undefined);
    }
  }

  applyCommand(command) {
    const { key, method, args } = command;
    const { Theme } = this.props.Theme;
    try {
      if (key === null && method === "setRoot") {
        const [root] = args;
        this.root = this.objects[root];
      } else if (method === "destroy") {
        delete this.objects[key];
      } else if (method in LayoutClasses) {
        const [children] = args;
        const LayoutClass = LayoutClasses[method];
        this.objects[key] = new LayoutClass(
          key,
          (key) => this.objects[key],
          children
        );
      } else if (method in TracerClasses) {
        const className = method;
        const [title = className] = args;
        const TracerClass = TracerClasses[className];
        this.objects[key] = new TracerClass(
          key,
          (key) => this.objects[key],
          title,
          Theme
        );
      } else {
        this.objects[key][method](...args);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  applyChunk(chunk) {
    chunk.commands.forEach((command) => this.applyCommand(command));
  }

  render() {
    const { className } = this.props;
    const { Theme } = this.props.Theme;

    return (
      <div
        className={classes(
          styles.visualization_viewer,
          Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight,
          className
        )}
      >
        {this.root ? (
          this.root.render()
        ) : (
          <div
            className={classes(
              styles.loader,
              Theme === "Light"
                ? styles.containerLight
                : Theme === "Dark"
                ? styles.containerDark
                : styles.containerLight
            )}
          >
            <ScaleLoader color={"#0b7af8"} loading={true} size={150} />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  ({ player, Theme }) => ({ player, Theme }),
  actions
)(VisualizationViewer);
