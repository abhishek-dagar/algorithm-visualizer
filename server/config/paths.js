const path = require('path');

const rootDir = path.resolve(__dirname,'..');
// const publicDir = path.resolve(rootDir, 'public');
const algorithmsDir = path.resolve(rootDir, 'files/Algorithms');
const documentaionDir = path.resolve(rootDir, 'files/Documentation')
module.exports={
    rootDir:rootDir,
    algorithmsDir:algorithmsDir,
    documentaionDir:documentaionDir,
}