import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Ellipsis, ListItem, Divider } from "components";
import styles from "./SideMenu.module.scss";
import { classes } from "common/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/fontawesome-free-solid";

export default function SideMenu(props) {
  const { topics, className, handelData } = props;
  const [categoriesOpened, setcategoriesOpened] = useState({});
  const { Topic } = props.params;
  const wrapperRef = [];

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
        className={classes(className, styles.container__sidebar)}
        ref={customref}
      >
        <div className={styles.title}>Algorithm Visualizer</div>
        <Divider/>
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
                <Ellipsis>{key}</Ellipsis>
                <FontAwesomeIcon
                  className={classes(styles.TickIcon)}
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
}
