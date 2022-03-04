import React from "react";
import { classes } from "common/util";
import { Divider } from "..";
import styles from "./ResizableContainer.module.scss";
import { connect } from "react-redux";
import { actions } from "reducers";

class ResizableContainer extends React.Component {
  handleResize(prevIndex, index, targetElement, clientX, clientY) {
    const { horizontal, visibles, onChangeWeights } = this.props;
    const weights = [...this.props.weights];

    const { left, top } = targetElement.getBoundingClientRect();
    const { offsetWidth, offsetHeight } = targetElement.parentElement;
    const position = horizontal ? clientX - left : clientY - top;
    const containerSize = horizontal ? offsetWidth : offsetHeight;

    let totalWeight = 0;
    let subtotalWeight = 0;
    weights.forEach((weight, i) => {
      if (visibles && !visibles[i]) return;
      totalWeight += weight;
      if (i < index) subtotalWeight += weight;
    });
    const newWeight = (position / containerSize) * totalWeight;
    let deltaWeight = newWeight - subtotalWeight;
    deltaWeight = Math.max(deltaWeight, -weights[prevIndex]);
    deltaWeight = Math.min(deltaWeight, weights[index]);
    weights[prevIndex] += deltaWeight;
    weights[index] -= deltaWeight;
    onChangeWeights(weights);
  }

  render() {
    const {
      className,
      children,
      horizontal,
      weights,
      visibles,
      revHorizontal,
    } = this.props;
    const { Theme } = this.props.Theme;
    const elements = [];
    let lastIndex = -1;
    const totalWeight = weights
      .filter((weight, i) => !visibles || visibles[i])
      .reduce((sumWeight, weight) => sumWeight + weight, 0);
    children.forEach((child, i) => {
      if (!visibles || visibles[i]) {
        if (~lastIndex) {
          const prevIndex = lastIndex;
          elements.push(
            <Divider
              key={`divider-${i}`}
              horizontal={revHorizontal ? false : horizontal}
              onResize={(target, dx, dy) =>
                this.handleResize(prevIndex, i, target, dx, dy)
              }
            />
          );
        }
        elements.push(
          <div
            key={i}
            className={classes(styles.wrapper)}
            style={{
              flexGrow: weights[i] / totalWeight,
              transition: "0.1s",
            }}
          >
            {child}
          </div>
        );
        lastIndex = i;
      }
    });

    return (
      <div
        className={classes(
          styles.resizable_container,
          Theme === "Light"
            ? styles.resizecontainerLight
            : Theme === "Dark"
            ? styles.resizecontainerDark
            : styles.resizecontainerLight,
          horizontal && styles.horizontal,
          className,
          revHorizontal && styles.revHorizontal
        )}
      >
        {elements}
      </div>
    );
  }
}

export default connect(({ Theme }) => ({ Theme }), actions)(ResizableContainer);
