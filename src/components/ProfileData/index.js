import React, { Component } from "react";
import Router from "next/router";
import styles from "./profiledata.module.scss";
import UserCard from "components/UserCard";
import {
  faCode,
  faPlus,
  faTrashAlt,
  faSearch,
} from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { classes } from "common/util";
import { userApi } from "apis";
import { extension } from "common/util";
import { languages } from "common/config";
import { actions } from "reducers";
import { connect } from "react-redux";
import { Button } from "components";

class ProfileData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userCode: [],
      searchStr: "",
    };
    this.onchange = this.onchange.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("userToken")) {
      Router.push("/");
    } else {
      userApi
        .getUserData({ userToken: localStorage.getItem("userToken") })
        .then(({ userData }) => {
          let tempuserCode = [];
          // if(userData.userCode.length>0){

          // }
          userData.userCodeData.map((data) => {
            const fileName = data.foldername;
            const fileExt = extension(data.name);
            const name = data.name;
            let langName = languages.find(
              (language) => language.ext === fileExt
            );
            langName = langName.name;
            tempuserCode.push({
              name,
              fileName,
              langName,
              content: data.content,
            });
          });
          this.setState({
            userCode: tempuserCode,
          });
        });
    }
  }

  handelDelete(foldername) {
    userApi
      .deletuserCodeData({
        userToken: localStorage.getItem("userToken"),
        foldername,
      })
      .then(({ userData }) => {
        let tempuserCode = [];
        userData.map((data) => {
          const fileName = data.foldername;
          const fileExt = extension(data.name);
          const name = data.name;
          let langName = languages.find((language) => language.ext === fileExt);
          langName = langName.name;
          tempuserCode.push({
            name,
            fileName,
            langName,
            content: data.content,
          });
        });
        this.setState({
          userCode: tempuserCode,
        });
      });
  }

  testQuery(value) {
    const { searchStr } = this.state;
    const refine = (string) => string.replace(/-/g, " ").replace(/[^\w ]/g, "");
    const refinedQuery = refine(searchStr);
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

  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const userCodeData = this.state.userCode;

    return (
      <>
        <nav className={classes(styles.navBar)}>
          <div className={styles.Header}>
            <div className={styles.HeaderItem}>
              <div className={styles.HeaderSearch}>
                <form className={styles.form} autoComplete={"off"}>
                  <label className={styles.label}>
                    <input
                      className={classes(styles.searchField)}
                      type="search"
                      name="searchStr"
                      placeholder="Search for your code"
                      aria-label="Search"
                      onChange={this.onchange}
                    />
                    <FontAwesomeIcon
                      className={classes(styles.searchBtn)}
                      fixedWidth
                      icon={faSearch}
                    />
                  </label>
                </form>
              </div>
            </div>
            <div className={styles.HeaderItem}>
              <div className={styles.HeaderSignout}>
                <button onClick={this.signout}>Sign out</button>
              </div>
            </div>
          </div>
        </nav>
        <div className={styles.userContainer}>
          <div className={styles.layout}>
            <div className={styles.UserInfo}>
              <div className={styles.userCard}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4333/4333609.png"
                  alt="userIcon"
                />
                <UserCard />
              </div>
            </div>
            <div className={styles.UserCodeInfo}>
              <div className={styles.recent3codes}>
                <h2 className={styles.heading}>Pinned</h2>
                <form>
                  <ol className={styles.items}>
                    {userCodeData
                      .filter((codedata) => {
                        if (this.testQuery(codedata.fileName)) {
                          return codedata;
                        }
                      })
                      .map((codedata, i) => {
                        return (
                          <li className={styles.item} key={i}>
                            <div className={styles.box}>
                              <div className={styles.itemDetail}>
                                <div className={styles.itemName}>
                                  <FontAwesomeIcon
                                    className={classes(styles.codeIcon)}
                                    fixedWidth
                                    icon={faCode}
                                  />
                                  <Link
                                    href={`/CodeSpace/${
                                      codedata.fileName
                                    }/${localStorage.getItem("userToken")}`}
                                  >
                                    <a className={styles.link}>
                                      <span>{codedata.fileName}</span>
                                    </a>
                                  </Link>
                                  <Button
                                    className={styles.delete}
                                    icon={faTrashAlt}
                                    primary
                                    confirmNeeded
                                    onClick={() => {
                                      const foldername = codedata.fileName;
                                      this.handelDelete(foldername);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                                <p className={styles.langInfo}>
                                  <span className={styles.smallbox}>
                                    <span
                                      className={classes(
                                        styles.langColor,
                                        codedata.langName.toLowerCase() ===
                                          "javascript"
                                          ? styles.javascript
                                          : codedata.langName.toLowerCase() ===
                                            "python"
                                          ? styles.python
                                          : ""
                                      )}
                                    ></span>
                                    <span className={styles.langName}>
                                      {codedata.langName}
                                    </span>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    <li className={styles.newitem}>
                      <div className={styles.box}>
                        <div className={styles.itemDetail}>
                          <div className={styles.itemName}>
                            <Link href={"/CodeSpace"}>
                              <a>
                                <FontAwesomeIcon
                                  className={classes(styles.codeIcon)}
                                  fixedWidth
                                  icon={faPlus}
                                />
                                <span>createNewFile</span>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ol>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  ({ current, userdata, env, Theme }) => ({ current, userdata, env, Theme }),
  actions
)(ProfileData);
