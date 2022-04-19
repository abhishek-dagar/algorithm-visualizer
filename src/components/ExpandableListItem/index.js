import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";
import faCaretRight from "@fortawesome/fontawesome-free-solid/faCaretRight";
import styles from "./ExpandableListItem.module.scss";
import { ListItem } from "..";
import { classes } from "common/util";

class ExpandableListItem extends React.Component {
  render() {
    const { className, children, opened, ...props } = this.props;
    let { icons } = this.props;
    if (!icons) {
      icons = [faCaretDown, faCaretRight];
    }

    return opened ? (
      <div className={classes(styles.expandable_list_item, className)}>
        <ListItem
          className={classes(styles.openedName, styles.category, className)}
          {...props}
        >
          <FontAwesomeIcon className={styles.icon} fixedWidth icon={icons[0]} />
        </ListItem>
        {children}
      </div>
    ) : (
      <ListItem
        className={classes(styles.category, className)}
        {...props}
      >
        <FontAwesomeIcon className={styles.icon} fixedWidth icon={icons[1]} />
      </ListItem>
    );
  }
}

export default ExpandableListItem;
