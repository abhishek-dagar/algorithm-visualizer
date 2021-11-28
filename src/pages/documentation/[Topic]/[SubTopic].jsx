import styles from "styles/docs.module.scss";
import React, { useState, useEffect } from "react";
import { ExpandableListItem, ListItem } from "components";
import Link from "next/link";
import {
  faAngleDown,
  faAngleRight,
  faCheck,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Markdown from "markdown-to-jsx";
import { classes } from "common/util";
import { DocsApi } from "apis";

export const getServerSideProps = async (context) => {
  return {
    props: {
      params: context.params,
    },
  };
};
const Documentation = (props) => {
  const [categoriesOpened, setcategoriesOpened] = useState({});
  const [topics, settopics] = useState([]);
  const [data, setdata] = useState("");
  const [active, setactive] = useState(false);
  const { Topic, SubTopic } = props.params;

  useEffect(() => {
    DocsApi.getDocsMenu().then(({ topics }) => {
      settopics(topics);
    });
    DocsApi.getDocsdata(Topic, SubTopic).then(({ data }) => {
      setdata(data);
    });
    toggleCategory(Topic, true);
  }, []);

  const icons = [faAngleDown, faAngleRight];
  const toggleCategory = (key, categoryOpened = !categoriesOpened[key]) => {
    const categoriesOpened = {
      ...categoriesOpened,
      [key]: categoryOpened,
    };
    setcategoriesOpened(categoriesOpened);
  };

  const handelData = (Topic, SubTopic) => {
    DocsApi.getDocsdata(Topic, SubTopic).then(({ data }) => {
      setdata(data);
    });
  };

  const handelCopy = (children) => {
    let str = "";
    if (typeof children === "object" && children.length > 0) {
      str = children[0];
    } else {
      str = children.props.children.trim();
    }
    setactive(true);
    navigator.clipboard
      .writeText(str)
      .then()
      .catch((err) => {
        console.error("Async: Could not copy text: ", err);
      });
    setTimeout(() => {
      setactive(false);
    }, 1250);
  };

  const MyPre = ({ children, ...props }) => {
    return (
      <pre {...props}>
        {children}
        <div
          className={classes(active ? styles.activeIcon : "", styles.copy_icon)}
          onClick={() => {
            handelCopy(children);
          }}
        >
          {!active ? (
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="far"
              data-icon="clone"
              className="svg-inline--fa fa-clone fa-w-16"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
              ></path>
            </svg>
          ) : (
            <FontAwesomeIcon
              className={classes(styles.TickIcon)}
              fixedWidth
              icon={faCheck}
            />
          )}
        </div>
      </pre>
    );
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.Banner}>
          <span className={styles.title}>
            <strong>Algorithm Visualizer</strong>
          </span>
        </div>
        <aside className={styles.container__sidebar}>
          <div>
            {topics.map((Topic) => {
              const key = Topic.key;
              const categoryOpened = categoriesOpened[key];
              return (
                <ExpandableListItem
                  className={classes(
                    styles.ExpandableList,
                    categoryOpened ? styles.opened : ""
                  )}
                  key={key}
                  onClick={() => toggleCategory(key)}
                  label={key}
                  opened={categoryOpened}
                  icons={icons}
                >
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
                </ExpandableListItem>
              );
            })}
          </div>
        </aside>
        <div className={styles.container__main}>
          <Markdown
            className={styles.content}
            options={{
              overrides: {
                pre: {
                  component: MyPre,
                  props: {
                    className: "foo",
                  },
                },
              },
            }}
          >
            {data}
          </Markdown>
        </div>
      </div>
    </>
  );
};
export default Documentation;
