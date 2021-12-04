const path = require("path");
const { files } = require("./Files");
const { listFiles } = require("../utils/hierarchy");

class Topics {
  constructor(path, name) {
    this.path = path;
    this.subTopics = ["Example", "Introduction"];
    this.subTopicsContent = [];
    this.key = name;
    this.refresh();
  }
  refresh() {
    const lastpath = this.path.split(`\\`);
    if (lastpath[lastpath.length - 1] === "GetStarted") {
      this.subTopics.forEach((element) => {
        this.subTopicsContent.push(
          new files(path.resolve(this.path, element + ".md"), element)
        );
      });
    } else {
      this.subTopics = [];
      listFiles(this.path).map((fileName) => {
        this.subTopics.push(fileName.split(".")[0]);
      });
      this.subTopics.forEach((element) => {
        this.subTopicsContent.push(
          new files(path.resolve(this.path, element + ".md"), element)
        );
      });
    }
  }
  toJSON() {
    const { key, subTopics, subTopicsContent } = this;
    return { key, subTopics, subTopicsContent };
  }
}

module.exports = {
  Topics: Topics,
};
