import React from "react";
import styles from "./MarkdownRenderer.module.scss";
import Markdown from "markdown-to-jsx";
import "highlight.js/styles/github-dark.css";
import Highlight from "react-highlight";
import Renderer from "../Renderer";
import { faCheck } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { classes } from "common/util";

class MarkdownRenderer extends Renderer {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handelCopy = this.handelCopy.bind(this);
    this.MyPre = this.MyPre.bind(this);
  }
  handelCopy(str) {
    this.setState({ active: true });
    navigator.clipboard
      .writeText(str)
      .then()
      .catch((err) => {
        console.error("Async: Could not copy text: ", err);
      });
    setTimeout(() => {
      this.setState({ active: false });
    }, 1250);
  }
  MyPre({ children, ...props }) {
    const { active } = this.state;
    let code = "";
    let ext = "";
    if (typeof children === "object" && children.length > 0) {
      code = children[0];
    } else {
      code = children.props.children.trim();
      ext = children.props.className.split("-");
      ext = ext[ext.length - 1];
    }
    return (
      <div className={styles.sourceShell}>
        <Highlight className={`language-${ext}`}>{code}</Highlight>
        <div
          className={classes(active ? styles.activeIcon : "", styles.copy_icon)}
          onClick={() => {
            this.handelCopy(code);
          }}
        >
          {!active ? (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="clone"
              className="svg-inline--fa fa-clone fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
              ></path>
            </svg>
          ) : (
            <FontAwesomeIcon
              className={classes(styles.TickIcon)}
              fixedWidth
              icon={faCheck}
            />
          )}
        </div>
      </div>
    );
  }
  renderData() {
    const { markdown } = this.props.data;

    return (
      <div className={styles.markdown}>
        <Markdown
          className={styles.content}
          options={{
            overrides: {
              pre: {
                component: this.MyPre,
                props: {
                  className: "foo",
                },
              },
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    );
  }
}

export default MarkdownRenderer;
