const path = require("path");
const fs = require('fs');
const createKey = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w \-]/g, "")
    .replace(/ /g, "-");
};
const isDirectory=(dirPath= String)=> {
    return fs.lstatSync(dirPath).isDirectory();
  }
const listFiles = (dirPath = String) => {
    // fs.pathExistsSync(dirPath)
  return fs.readdirSync(dirPath).filter((fileName) => !fileName.startsWith("."));
};
const listDirectories = (dirPath= string) => {
    return listFiles(dirPath).filter(fileName => isDirectory(path.resolve(dirPath, fileName)));
  }

module.exports = {
  createKey: createKey,
  listFiles:listFiles,
  isDirectory:isDirectory,
  listDirectories:listDirectories,
};
