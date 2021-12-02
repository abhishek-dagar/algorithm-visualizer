import React from "react";
import { connect } from "react-redux";
import Promise from "bluebird";
import Head from "next/head";
import {
  BaseComponent,
  Header,
  Navigator,
  ResizableContainer,
  TabContainer,
  ToastContainer,
  VisualizationViewer,
  VsCodeEditor,
} from "../components";
import { AlgorithmApi } from "apis";
import { actions } from "reducers";
import { extension } from "common/util";
import { exts } from "common/config";
import styles from "./App.module.scss";
import Router from "next/router";

class App extends BaseComponent {
  constructor(props) {
    super(props);

    this.state = {
      workspaceVisibles: [true, true],
      workspaceWeights: [0.2, 2],
    };
    this.handleClickTitleBar = this.handleClickTitleBar.bind(this);
    this.handleChangeWorkspaceWeights =
      this.handleChangeWorkspaceWeights.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;
    this.loadAlgorithm(params);

    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        this.setState({ workspaceWeights: [0.2, 1] });
      }
    }

    AlgorithmApi.getCategories()
      .then(({ categories }) => {
        this.props.setCategories(categories);
      })
      .catch(this.handleError);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;
    if (params !== this.props.match.params) {
      const { categoryKey, algorithmKey } = params;
      const { algorithm } = nextProps.current;
      if (
        algorithm &&
        algorithm.categoryKey === categoryKey &&
        algorithm.algorithmKey === algorithmKey
      )
        return;
      this.loadAlgorithm(params);
    }
  }

  loadAlgorithm({ categoryKey, algorithmKey }) {
    const fetch = () => {
      if (categoryKey && algorithmKey) {
        return AlgorithmApi.getAlgorithm(categoryKey, algorithmKey).then(
          ({ algorithm }) => {
            this.props.setAlgorithm(algorithm);
          }
        );
      } else {
        this.props.setHome();
      }
      return Promise.resolve();
    };
    fetch()
      .then(() => {
        this.selectDefaultTab();
        return null;
      })
      .catch((error) => {
        this.handleError(error);
        Router.push("/PageNotFound");
      });
  }

  selectDefaultTab() {
    const { ext } = this.props.env;
    const { files } = this.props.current;
    const editingFile =
      files.find((file) => extension(file.name) === "md") ||
      // files.find((file) => extension(file.name) === ext) ||
      // files.find((file) => exts.includes(extension(file.name))) ||
      files[files.length - 1];
    this.props.setEditingFile(editingFile);
  }

  handleChangeWorkspaceWeights(workspaceWeights) {
    this.setState({ workspaceWeights });
  }

  toggleNavigatorOpened(navigatorOpened = !this.state.workspaceVisibles[0]) {
    const workspaceVisibles = [...this.state.workspaceVisibles];
    workspaceVisibles[0] = navigatorOpened;
    this.setState({ workspaceVisibles });
  }

  handleClickTitleBar() {
    this.toggleNavigatorOpened();
  }

  render() {
    const { workspaceVisibles, workspaceWeights } = this.state;
    const { titles, saved } = this.props.current;

    const title = `${saved ? "" : "(Unsaved) "}${titles.join(" - ")}`;
    const [navigatorOpened] = workspaceVisibles;

    return (
      <>
        <div className={styles.app}>
          <Head>
            <title>{title}</title>
          </Head>
          <Header
            className={styles.header}
            onClickTitleBar={this.handleClickTitleBar}
            navigatorOpened={navigatorOpened}
            // ignoreHistoryBlock={this.ignoreHistoryBlock}
          />
          <ResizableContainer
            className={styles.workspace}
            horizontal
            weights={workspaceWeights}
            visibles={workspaceVisibles}
            onChangeWeights={this.handleChangeWorkspaceWeights}
          >
            <Navigator onClickTitleBar={this.handleClickTitleBar} />
            <TabContainer className={styles.editor_tab_container}>
              <VsCodeEditor />
              <VisualizationViewer className={styles.visualization_viewer} />
            </TabContainer>
          </ResizableContainer>
          <ToastContainer className={styles.toast_container} />
        </div>
        <div className={styles.unavailable}>
          <h1>this page opens in Desktop</h1>
        </div>
      </>
    );
  }
}

export default connect(({ current, env }) => ({ current, env }), actions)(App);
