import React from "react";
import styles from "./MarkdownRenderer.module.scss";
import Markdown from "markdown-to-jsx";
import Renderer from "../Renderer";

class MarkdownRenderer extends Renderer {
  renderData() {
    const { markdown } = this.props.data;

    return (
      <div className={styles.markdown}>
        <Markdown className={styles.content}>{markdown}</Markdown>
      </div>
    );
  }
}

export default MarkdownRenderer;
