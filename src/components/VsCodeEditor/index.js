import React, { Component } from "react";
import { extension } from "common/util";
import { actions } from "reducers";
import { connect } from "react-redux";
import { languages } from "common/config";
import Editor from "@monaco-editor/react";
class VsCodeEditor extends Component {
  handleEditorDidMount() {
    monaco.editor.defineTheme("my-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [{ background: "161b22" }],
      colors: {
        "editor.background": "#161b22",
      },
    });
    monaco.editor.setTheme("my-theme");
  }
  handleEditorValidation(markers) {
    // markers.forEach((marker) => console.log("onValidate:", marker.message));
  }
  render() {
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
      readOnly: true,
      wordWrap: "on",
      dragAndDrop:true,
    };
    return (
      <Editor
        language={mode}
        onMount={this.handleEditorDidMount}
        onValidate={this.handleEditorValidation}
        value={editingFile.content}
        automaticLayout={true}
        options={options}
      />
    );
  }
}
export default connect(
  ({ current, env, player }) => ({ current, env, player }),
  actions,
  null,
  { forwardRef: true }
)(VsCodeEditor);
