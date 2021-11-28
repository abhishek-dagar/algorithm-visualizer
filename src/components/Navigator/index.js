import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSearch } from "@fortawesome/fontawesome-free-solid";
import { ExpandableListItem, ListItem } from "..";
import { classes } from "common/util";
import { actions } from "reducers";
import styles from "./Navigator.module.scss";
import Link from "next/link";

class Navigator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesOpened: {},
      query: "",
    };
  }

  componentDidMount() {
    const { algorithm } = this.props.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { algorithm } = nextProps.current;
    if (algorithm) {
      this.toggleCategory(algorithm.categoryKey, true);
    }
  }

  toggleCategory(key, categoryOpened = !this.state.categoriesOpened[key]) {
    const categoriesOpened = {
      ...this.state.categoriesOpened,
      [key]: categoryOpened,
    };
    this.setState({ categoriesOpened });
  }

  handleChangeQuery(e) {
    const { categories } = this.props.directory;
    const categoriesOpened = {};
    const query = e.target.value;
    categories.forEach((category) => {
      if (
        this.testQuery(category.name) ||
        category.algorithms.find((algorithm) => this.testQuery(algorithm.name))
      ) {
        categoriesOpened[category.key] = true;
      }
    });
    this.setState({ categoriesOpened, query });
  }

  testQuery(value) {
    const { query } = this.state;
    const refine = (string) => string.replace(/-/g, " ").replace(/[^\w ]/g, "");
    const refinedQuery = refine(query);
    const refinedValue = refine(value);
    return (
      new RegExp(`(^| )${refinedQuery}`, "i").test(refinedValue) ||
      new RegExp(refinedQuery, "i").test(
        refinedValue
          .split(" ")
          .map((v) => v && v[0])
          .join("")
      )
    );
  }

  render() {
    const { categoriesOpened, query } = this.state;
    const { className } = this.props;
    const { categories } = this.props.directory;
    const { algorithm } = this.props.current;

    const categoryKey = algorithm && algorithm.categoryKey;
    const algorithmKey = algorithm && algorithm.algorithmKey;

    return (
      <nav className={classes(styles.navigator, className)}>
        <div className={styles.search_bar_container}>
          <FontAwesomeIcon
            fixedWidth
            icon={faSearch}
            className={styles.search_icon}
          />
          <input
            type="text"
            className={styles.search_bar}
            aria-label="Search"
            placeholder="Search ..."
            autoFocus
            value={query}
            onChange={(e) => this.handleChangeQuery(e)}
          />
        </div>
        <div className={styles.algorithm_list}>
          {categories.map((category) => {
            const categoryOpened = categoriesOpened[category.key];
            let algorithms = category.algorithms;
            if (!this.testQuery(category.name)) {
              algorithms = algorithms.filter((algorithm) =>
                this.testQuery(algorithm.name)
              );
              if (!algorithms.length) return null;
            }
            return (
              <ExpandableListItem
                key={category.key}
                onClick={() => this.toggleCategory(category.key)}
                label={category.name}
                opened={categoryOpened}
              >
                {algorithms.map((algorithm) => (
                  <Link
                    href={`/Algo-visual/${category.key}/${algorithm.key}`}
                    key={algorithm.key}
                  >
                    <a>
                      <ListItem
                        indent
                        selected={
                          category.key === categoryKey &&
                          algorithm.key === algorithmKey
                        }
                        label={algorithm.name}
                      />
                    </a>
                  </Link>
                ))}
              </ExpandableListItem>
            );
          })}
        </div>
        <div
          className={styles.closeNavigator}
          onClick={this.props.onClickTitleBar}
        >
          <FontAwesomeIcon
            fixedWidth
            icon={faChevronLeft}
            className={styles.search_icon}
          />
        </div>
      </nav>
    );
  }
}

export default connect(
  ({ current, directory, env }) => ({ current, directory, env }),
  actions
)(Navigator);
