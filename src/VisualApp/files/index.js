import { createProjectFile, createUserFile } from "common/util";


const getName = (filePath) => filePath.split("/").pop();
const getContent = (filePath) => require("!raw-loader!./" + filePath).default;
const readProjectFile = (filePath) =>
  createProjectFile(getName(filePath), getContent(filePath));
const readUserFile = (filePath) =>
  createUserFile(getName(filePath), getContent(filePath));

export const CODE_JS = readUserFile("skeletons/code.js");
export const README_MD = readProjectFile("README.md");
