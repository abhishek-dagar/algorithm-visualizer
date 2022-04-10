import React, { Component } from "react";
import { extension } from "common/util";
import { actions } from "reducers";
import { connect } from "react-redux";
import { languages } from "common/config";
import Editor from "@monaco-editor/react";
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
  render() {
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
    if(Theme=="Dark"){
      theme="my-theme-dark";
    }else{theme="my-theme-light";}
    return (
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
    );
  }
}
export default connect(
  ({ current, env, player, Theme }) => ({ current, env, player, Theme }),
  actions,
  null,
  { forwardRef: true }
)(VsCodeEditor);
