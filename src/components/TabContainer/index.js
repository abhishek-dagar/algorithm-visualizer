import React from "react";
import { connect } from "react-redux";
import { Tabs } from "components";
import { classes } from "common/util";
import { actions } from "reducers";
import styles from "./TabContainer.module.scss";
import { ResizableContainer, Player } from "components";

class TabContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      workspaceVisibles: [true, true],
      workspaceWeights: [0.7, 1],
    };
    this.handleChangeWorkspaceWeights =
      this.handleChangeWorkspaceWeights.bind(this);
  }

  handleChangeWorkspaceWeights(workspaceWeights) {
    this.setState({ workspaceWeights });
  }

  render() {
    const { className, children } = this.props;
    const { editingFile } = this.props.current;
    const { workspaceVisibles, workspaceWeights } = this.state;
    const { Theme } = this.props.Theme;

    if (!editingFile) return null;
    let revHorizontal = false;
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        revHorizontal = true;
      }
    }

    return (
      <div
        className={classes(
          styles.tab_container,
          Theme === "Light"
            ? styles.TabcontainerLight
            : Theme === "Dark"
            ? styles.TabcontainerDark
            : styles.TabcontainerLight,
          className
        )}
      >
        {!revHorizontal ? (
          <>
            <div className={styles.tab_bar}>
              <div className={styles.section}>
                <Tabs />
              </div>
              <Player className={styles.section} />
            </div>
            <div className={styles.content}>
              <ResizableContainer
                className={styles.workspace}
                horizontal
                weights={workspaceWeights}
                visibles={workspaceVisibles}
                onChangeWeights={this.handleChangeWorkspaceWeights}
              >
                {children}
              </ResizableContainer>
            </div>
          </>
        ) : (
          <>
            <div className={styles.content}>
              <ResizableContainer
                className={styles.workspace}
                horizontal
                revHorizontal={revHorizontal}
                weights={workspaceWeights}
                visibles={workspaceVisibles}
                onChangeWeights={this.handleChangeWorkspaceWeights}
              >
                <>
                  <div className={styles.tab_bar}>
                    <Tabs />
                  </div>
                  {children[0]}
                </>
                <>
                  <div className={styles.tab_bar}>
                    <Player className={styles.section} />
                  </div>
                  {children[1]}
                </>
              </ResizableContainer>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default connect(
  ({ current, env, Theme }) => ({ current, env, Theme }),
  actions
)(TabContainer);
