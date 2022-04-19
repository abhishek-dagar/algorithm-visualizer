import React from "react";
import styles from "./ListItem.module.scss";
import { classes } from "common/util";
import { Button, Ellipsis } from "..";
import { connect } from "react-redux";
import { actions } from "reducers";

class ListItem extends React.Component {
  render() {
    const { className, children, indent, label, ...props } = this.props;
    const { Theme } = this.props.Theme;
    const { selected } = this.props;

    return (
      <Button
        className={classes(
          styles.list_item,
          indent && styles.indent,
          indent && Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight,
          selected && styles.selected,
          className
        )}
        {...props}
      >
        <Ellipsis className={styles.label}>{label}</Ellipsis>
        {children}
      </Button>
    );
  }
}

// export default ListItem;
export default connect(({ Theme }) => ({ Theme }), actions)(ListItem);
