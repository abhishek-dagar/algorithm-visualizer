const classes = (...arr) => arr.filter(v => v).join(' ');

const distance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const extension = fileName => /(?:\.([^.]+))?$/.exec(fileName)[1];

const refineGist = gist => {
  const title = gist.description;
  delete gist.files['algorithm-visualizer'];
  const files = Object.values(gist.files).map(file => ({
    name: file.filename,
    content: file.content,
  }));
  return { title, files };
};

const createFile = (name, content) => ({ name, content });

const createProjectFile = (name, content) => createFile(name, content);

const createUserFile = (name, content) => createFile(name, content);

const isSaved = ({ titles, files, lastTitles, lastFiles }) => {
  const serialize = (titles, files) => JSON.stringify({
    titles,
    files: files.map(({ name, content }) => ({ name, content })),
  });
  return serialize(titles, files) === serialize(lastTitles, lastFiles);
};

export {
  classes,
  distance,
  extension,
  refineGist,
  createFile,
  createProjectFile,
  createUserFile,
  isSaved,
};
