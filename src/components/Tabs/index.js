import React from "react";
import Image from "next/image";
import { Ellipsis } from "components";
import styles from "./tabs.module.scss";
import { classes, extension } from "common/util";
import { PythonIcon, JsIcon, MarkdownIcon } from "assets/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/fontawesome-free-solid";
import { actions } from "reducers";
import { connect } from "react-redux";
// import { languages } from "common/config";

const Tabs = (props) => {
  // const handleAddFile = () => {
  //   const { ext } = props.env;
  //   const { files } = props.current;
  //   const language = languages.find((language) => language.ext === ext);
  //   const newFile = { ...language.skeleton };
  //   let count = 0;
  //   while (files.some((file) => file.name === newFile.name))
  //     newFile.name = `code-${++count}.${ext}`;
  //   props.addFile(newFile);
  // };
  const { editingFile, files } = props.current;
  const { Theme } = props.Theme;
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
    <>
      <div
        className={classes(
          styles.title,
          Theme === "Light"
            ? styles.TabLight
            : Theme === "Dark"
            ? styles.TabDark
            : styles.TabLight,
          styles.fake
        )}
      />
      {files.map((file, i) =>
        file === editingFile ? (
          <div
            className={classes(
              styles.title,
              styles.titleTheme === "Light"
                ? styles.TabLight
                : Theme === "Dark"
                ? styles.TabDark
                : styles.TabLight,
              styles.selected
            )}
            key={i}
          >
            <Image src={iconName[i]} alt="lang" width={20} height={20}></Image>
            <Ellipsis className={styles.filename}>{file.name}</Ellipsis>
          </div>
        ) : (
          <div
            className={classes(
              styles.title,
              Theme === "Light"
                ? styles.TabLight
                : Theme === "Dark"
                ? styles.TabDark
                : styles.TabLight
            )}
            key={i}
            onClick={() => props.setEditingFile(file)}
          >
            <Image src={iconName[i]} alt="lang" width={20} height={20}></Image>
            <span className={styles.filename}>{file.name}</span>
          </div>
        )
      )}
      {/* <div className={styles.title} onClick={() => handleAddFile()}>
        <FontAwesomeIcon fixedWidth icon={faPlus} />
      </div> */}
      <div className={classes(styles.title, styles.fake)} />
    </>
  );
};
export default connect(
  ({ current, env, Theme }) => ({ current, env, Theme }),
  actions
)(Tabs);
