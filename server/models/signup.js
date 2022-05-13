const fs = require("fs");
const path = require("path");
class signup {
  loadLogindata() {
    var data = fs.readFileSync(
      path.resolve(__dirname, "../UserData/loginData.json")
    );
    var myObject = JSON.parse(data);
    return myObject;
  }
  finduser(email) {
    const dataobj = this.loadLogindata();
    if (dataobj[email] === undefined) {
      return true;
    }
    return false;
  }
  createUserData() {
    var data = fs.readFileSync(
      path.resolve(__dirname, "../UserData/userData.json")
    );
    var myObject = JSON.parse(data);
    return myObject;
  }
  genrateRandomString() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < 75; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
  }
  AddnewUser({ username, email, password }) {
    if (this.finduser(email)) {
      const dataobj = this.loadLogindata();
      const userDataobj = this.createUserData();
      const userToken = this.genrateRandomString();
      dataobj[email] = { username, email, password, userToken };
      userDataobj[userToken] = { userInfo: {}, userCodeData: {} };
      userDataobj[userToken]["userInfo"] = { username, email, bio:"" };
      userDataobj[userToken]["userCodeData"] = [];

      fs.writeFile(
        path.resolve(__dirname, "../UserData/loginData.json"),
        JSON.stringify(dataobj),
        (err) => {
          // error checking
          if (err) throw err;

          return false;
        }
      );
      fs.writeFile(
        path.resolve(__dirname, "../UserData/userData.json"),
        JSON.stringify(userDataobj),
        (err) => {
          // error checking
          if (err) throw err;

          return false;
        }
      );
      return userToken;
    }
    return false;
  }
}
module.exports = {
  signup: signup,
};
