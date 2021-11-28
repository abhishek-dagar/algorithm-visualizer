import React from "react";
import { connect } from "react-redux";
import { Ellipsis } from "..";
import { classes, extension } from "common/util";
import { languages } from "common/config";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/fontawesome-free-solid";
import Image from "next/image";
import { PythonIcon, JsIcon, MarkdownIcon } from "assets/icons";
import { actions } from "reducers";
import styles from "./TabContainer.module.scss";

class TabContainer extends React.Component {
  handleAddFile() {
    const { ext } = this.props.env;
    const { files } = this.props.current;
    const language = languages.find((language) => language.ext === ext);
    const newFile = { ...language.skeleton };
    let count = 0;
    while (files.some((file) => file.name === newFile.name))
      newFile.name = `code-${++count}.${ext}`;
    this.props.addFile(newFile);
  }

  render() {
    const { className, children } = this.props;
    const { editingFile, files } = this.props.current;

    if (!editingFile) return null;
    const iconName = [];
    files.forEach((file) => {
      const fileExt = extension(file.name);
      if (fileExt === "js") {
        iconName.push(JsIcon);
      } else if (fileExt === "py") {
        iconName.push(PythonIcon);
      } else {
        iconName.push(MarkdownIcon);
      }
    });

    return (
      <div className={classes(styles.tab_container, className)}>
        <div className={styles.tab_bar}>
          <div className={classes(styles.title, styles.fake)} />
          {files.map((file, i) =>
            file === editingFile ? (
              <div className={classes(styles.title, styles.selected)} key={i}>
                <Image
                  src={iconName[i]}
                  alt="lang"
                  width={20}
                  height={20}
                ></Image>
                <Ellipsis className={styles.filename}>{file.name}</Ellipsis>
              </div>
            ) : (
              <div
                className={styles.title}
                key={i}
                onClick={() => this.props.setEditingFile(file)}
              >
                <Image
                  src={iconName[i]}
                  alt="lang"
                  width={20}
                  height={20}
                ></Image>
                <span className={styles.filename}>
                {file.name}
                </span>
              </div>
            )
          )}
          {/* <div className={styles.title} onClick={() => this.handleAddFile()}>
            <FontAwesomeIcon fixedWidth icon={faPlus} />
          </div> */}
          <div className={classes(styles.title, styles.fake)} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    );
  }
}

export default connect(
  ({ current, env }) => ({ current, env }),
  actions
)(TabContainer);
