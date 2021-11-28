const { algorithmsDir, documentaionDir } = require("../config");
const { listDirectories } = require("../utils/hierarchy");
const { Category, Topics } = require("./");
const path = require("path");

class Hierarchy {
  constructor() {
    this.categories = [];
    this.documentationTopics = [];
    this.algoPath = algorithmsDir;
    this.docsPath = documentaionDir;
    this.refresh();
  }
  refresh() {
    listDirectories(this.algoPath).map((categoryName) => {
      this.categories.push(
        new Category(path.resolve(this.algoPath, categoryName), categoryName)
      );
    });

    // const files = [];
    // this.categories.forEach((category) =>
    //   category.algorithms.forEach((algorithm) => {
    //     files.push(algorithm.file);
    //   })
    // );

    listDirectories(this.docsPath).map((topics) => {
      this.documentationTopics.push(
        new Topics(path.resolve(this.docsPath, topics), topics)
      );
    });
  }
  find(categoryKey = String, algorithmKey = String) {
    const category = this.categories.find(
      (category) => category.key === categoryKey
    );
    if (!category) return;
    const algorithm = category.algorithms.find(
      (algorithm) => algorithm.key === algorithmKey
    );
    if (!algorithm) return;
    const categoryName = category.name;
    const algorithmName = algorithm.name;
    const files = algorithm.files;

    return { categoryKey, categoryName, algorithmKey, algorithmName, files };
  }
  findDocs(Topic, SubTopic) {
    const topic = this.documentationTopics.find((topic) => topic.key === Topic);
    if (!topic) return;
    const subTopic = topic.subTopics.find((subTopic) => subTopic === SubTopic);
    if (!subTopic) return;
    const subTopicContent = topic.subTopicsContent.find(
      (element) => element.name === SubTopic
    );
    if (!subTopicContent) return;
    const data = subTopicContent.content;
    return { data };
  }
}
module.exports = {
  Hierarchy: Hierarchy,
};
