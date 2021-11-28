const path = require("path");
const { createKey, listDirectories } = require("../utils/hierarchy");
const { Algorithm } = require("./Algorithm");

class Category {
  constructor(path, name) {
    this.path = path;
    this.algorithms = [];
    this.name=name;
    this.key = createKey(name);
    this.refresh()
  }
  refresh() {
    listDirectories(this.path).map(
      (algorithmName) =>
      this.algorithms.push(new Algorithm(path.resolve(this.path, algorithmName), algorithmName))
    );
  }
  toJSON() {
    const { key, name, algorithms } = this;
    return { key, name, algorithms };
  }
}

module.exports = {
  Category: Category,
};
