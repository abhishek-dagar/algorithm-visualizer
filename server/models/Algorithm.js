const path = require("path");
const { files } = require("./Files");
const { createKey, listFiles } = require("../utils/hierarchy");

class Algorithm {
  constructor(path, name) {
    this.path = path;
    this.name = name;
    this.files = [];
    this.key = createKey(name);
    this.refresh();
  }
  refresh() {
    this.files = listFiles(this.path).map(
      (fileName) => (new files(path.resolve(this.path, fileName), fileName))
    );
  }
  toJSON() {
    const { key, name } = this;
    return { key, name };
  }
}
module.exports = {
    Algorithm: Algorithm,
};
