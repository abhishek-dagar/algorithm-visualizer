const fs = require("fs");
const path = require("path");
class signin {
  loaddata() {
    var data = fs.readFileSync(
      path.resolve(__dirname, "../UserData/loginData.json")
    );
    var myObject = JSON.parse(data);
    return myObject;
  }
  finduser(email, password) {
    const dataobj = this.loaddata();
    if (dataobj[email] === undefined) {
      return false;
    }
    if (dataobj[email].password === password) {
      return true;
    }
    return false;
  }
  CheckUser({ email, password }) {
    if (this.finduser(email, password)) {
      const dataobj = this.loaddata();
      return dataobj[email].userToken;
    }
    return false;
  }
}
module.exports = {
  signin: signin,
};
