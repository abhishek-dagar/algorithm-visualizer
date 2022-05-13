const fs = require("fs");
const path = require("path");
class UserData {
  UserDatafile() {
    var data = fs.readFileSync(
      path.resolve(__dirname, "../UserData/userData.json")
    );
    if (!data || data === null || data === "") {
      data = {};
    }
    var myObject = JSON.parse(data);
    return myObject;
  }
  loginDatafile() {
    var data = fs.readFileSync(
      path.resolve(__dirname, "../UserData/loginData.json")
    );
    var myObject = JSON.parse(data);
    return myObject;
  }
  getuserData({ userToken }) {
    const userDataobj = this.UserDatafile();
    return userDataobj[userToken];
  }
  updateuserData({ userToken, username, bio, Desgnation }) {
    const userDataobj = this.UserDatafile();
    if (!userDataobj) return false;
    userDataobj[userToken].userInfo = { username, bio, Desgnation };
    fs.writeFileSync(
      path.resolve(__dirname, "../UserData/userData.json"),
      JSON.stringify(userDataobj),
      (err) => {
        if (err) throw err;
        return false;
      }
    );
    return userDataobj[userToken];
  }
  addnewCodeData({ userToken, foldername, name, content }) {
    const userDataobj = this.UserDatafile();
    if (!userDataobj) return false;
    userDataobj[userToken].userCodeData.push({ foldername, name, content });
    fs.writeFileSync(
      path.resolve(__dirname, "../UserData/userData.json"),
      JSON.stringify(userDataobj),
      (err) => {
        if (err) throw err;
        return false;
      }
    );
    return userDataobj[userToken].userCodeData;
  }
  updateuserCodeData({ userToken, foldername, name, content }) {
    const userDataobj = this.UserDatafile();
    if (!userDataobj) return false;
    const files = userDataobj[userToken].userCodeData;
    const file = files.find((ele) => {
      return ele.foldername === foldername;
    });
    if (!name) {
      name = file.name;
    }
    if (!content) {
      content = file.content;
    }
    files.map((ele, i) => {
      if (ele.foldername === foldername) {
        (ele.name = name), (ele.content = content), (files[i] = ele);
      }
    });
    userDataobj[userToken].userCodeData = files;
    fs.writeFileSync(
      path.resolve(__dirname, "../UserData/userData.json"),
      JSON.stringify(userDataobj),
      (err) => {
        if (err) throw err;
        return false;
      }
    );
    return userDataobj[userToken].userCodeData;
  }

  deletuserCodeData({ userToken, foldername }) {
    const userDataobj = this.UserDatafile();
    if (!userDataobj) return false;
    const files = userDataobj[userToken].userCodeData;
    let count = -1;
    files.map((ele, i) => {
      if (ele.foldername === foldername) {
        count = i;
      }
    });
    // console.log(count);
    files.splice(count, 1);
    userDataobj[userToken].userCodeData = files;
    fs.writeFileSync(
      path.resolve(__dirname, "../UserData/userData.json"),
      JSON.stringify(userDataobj),
      (err) => {
        if (err) throw err;
        return false;
      }
    );
    return userDataobj[userToken].userCodeData;
  }
}

module.exports = {
  UserData: UserData,
};
