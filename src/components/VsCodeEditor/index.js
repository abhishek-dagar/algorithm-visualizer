import React, { Component } from "react";
import { extension } from "common/util";
import { actions } from "reducers";
import { connect } from "react-redux";
import { languages } from "common/config";
import Editor from "@monaco-editor/react";
import { faSave, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import { Ellipsis, Button } from "components";
import { classes } from "common/util";
import styles from "./codeEditor.module.scss";
import { userApi } from "apis";
import Router from "next/router";

class VsCodeEditor extends Component {
  constructor(props) {
    super(props);
  }
  setEditorTheme(monaco) {
    monaco.editor.defineTheme("my-theme-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "161b22" }],
      colors: {
        "editor.background": "#161b22",
      },
    });
    monaco.editor.defineTheme("my-theme-light", {
      base: "vs",
      inherit: true,
      rules: [{ background: "ebf5fc" }],
      colors: {
        "editor.background": "#ebf5fc",
      },
    });
  }
  handleEditorValidation(markers) {
    // markers.forEach((marker) => console.log("onValidate:", marker.message));
  }
  handleEditorChange(value, event) {
    console.log("here is the current model value:", value);
  }
  handelsavefile(editingFile) {
    const fileobj = {
      userToken: localStorage.getItem("userToken"),
      foldername: this.props.current.titles[0],
      name: editingFile.name,
      content: editingFile.content,
    };
    if (this.props.newFile) {
      userApi.addnewCodeData(fileobj);
      Router.push(`/CodeSpace/${fileobj.foldername}/${fileobj.userToken}`);
    } else {
      userApi.updateuserCodeData(fileobj);
    }
    this.props.saveFile(editingFile);
  }

  handelDelete() {
    userApi.deletuserCodeData({
      userToken: localStorage.getItem("userToken"),
      foldername: this.props.current.titles[0],
    });
    Router.push("/profile");
  }

  render() {
    const { className } = this.props;
    const { Theme } = this.props.Theme;
    const theme = "my-theme-light";
    const { editingFile } = this.props.current;
    if (!editingFile) return null;
    const fileExt = extension(editingFile.name);
    const language = languages.find((language) => language.ext === fileExt);
    let mode = language
      ? language.mode
      : fileExt === "md"
      ? "markdown"
      : fileExt === "json"
      ? "json"
      : "plain_text";
    const options = {
      // readOnly: true,
      wordWrap: "on",
      dragAndDrop: true,
    };
    if (Theme == "Dark") {
      theme = "my-theme-dark";
    } else {
      theme = "my-theme-light";
    }
    return (
      <>
        <Editor
          language={mode}
          onMount={this.handleEditorDidMount}
          onValidate={this.handleEditorValidation}
          value={editingFile.content}
          automaticLayout={true}
          options={options}
          beforeMount={this.setEditorTheme}
          theme={theme}
          onChange={(code) => {
            this.props.modifyFile(editingFile, code);
          }}
        />
        {this.props.user ? (
          <div className={classes(styles.contributors_viewer, className)}>
            <div className={styles.empty}>
              <div className={styles.empty} />
              <Button
                className={styles.save}
                icon={faSave}
                primary
                confirmNeeded
                onClick={() => this.handelsavefile(editingFile)}
              >
                <Ellipsis>save File</Ellipsis>
              </Button>
              <Button
                className={styles.delete}
                icon={faTrashAlt}
                primary
                confirmNeeded
                onClick={() => {
                  this.handelDelete();
                }}
              >
                <Ellipsis>Delete</Ellipsis>
              </Button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default connect(
  ({ current, env, player, Theme }) => ({ current, env, player, Theme }),
  actions,
  null,
  { forwardRef: true }
)(VsCodeEditor);
