import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Ellipsis, ListItem, Divider } from "components";
import styles from "./SideMenu.module.scss";
import { classes } from "common/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/fontawesome-free-solid";
import { connect } from "react-redux";
import { actions } from "reducers";

const SideMenu = (props) => {
  const { topics, className, handelData } = props;
  const [categoriesOpened, setcategoriesOpened] = useState({});
  const { Topic } = props.params;
  const wrapperRef = [];
  const { Theme } = props.Theme;

  const toggleCategory = (key, categoryOpened = !categoriesOpened[key]) => {
    const categoriesOpened = {
      ...categoriesOpened,
      [key]: categoryOpened,
    };
    setcategoriesOpened(categoriesOpened);
  };

  const handleclickoutside = (event) => {
    wrapperRef.forEach((Ref) => {
      if (Ref.current && !Ref.current.contains(event.target)) {
        toggleCategory(Topic, false);
      }
    });
  };

  const customref = (refernce) => {
    wrapperRef.push({ current: refernce });
  };

  useEffect(() => {
    if (typeof window !== undefined && window.innerWidth < 1400) {
      toggleCategory(Topic, false);
    } else {
      toggleCategory(Topic, true);
    }
    if (typeof document !== undefined) {
      document.addEventListener("click", handleclickoutside);
    }
    return () => {
      document.removeEventListener("click", handleclickoutside);
    };
  }, []);
  return (
    <>
      <aside
        className={classes(
          className,
          styles.container__sidebar,
          Theme === "Light"
            ? styles.containerLight
            : Theme === "Dark"
            ? styles.containerDark
            : styles.containerLight
        )}
        ref={customref}
      >
        <div className={styles.title}>Documentation</div>
        <Divider className={styles.divider} />
        <div className={styles.MenuContainer}>
          {topics.map((Topic) => {
            const key = Topic.key;
            return (
              <div
                className={classes(
                  styles.ExpandableList,
                  categoriesOpened[key] ? styles.opened : ""
                )}
                key={key}
                onClick={() => {
                  toggleCategory(key);
                }}
              >
                <Ellipsis className={styles.mainKey}>{key}</Ellipsis>
                <FontAwesomeIcon
                  className={classes(styles.Opener)}
                  fixedWidth
                  icon={categoriesOpened[key] ? faAngleDown : faAngleRight}
                />
                <div className={styles.list_container}>
                  {Topic.subTopics.map((subtopic) => {
                    return (
                      <Link
                        key={subtopic}
                        href={`/documentation/${key}/${subtopic}`}
                      >
                        <a
                          onClick={() => {
                            handelData(key, subtopic);
                          }}
                        >
                          <ListItem
                            className={styles.ListItem}
                            indent
                            label={subtopic}
                          />
                        </a>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
};
export default connect(({ Theme }) => ({ Theme }), actions)(SideMenu);
