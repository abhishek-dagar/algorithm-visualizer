import { combineActions, createAction, handleActions } from "redux-actions";
import { README_MD } from "VisualApp/files";
import { extension, isSaved } from "common/util";

const prefix = "CURRENT";

const setHome = createAction(`${prefix}/SET_HOME`, () => defaultState);
const setAlgorithm = createAction(
  `${prefix}/SET_ALGORITHM`,
  ({ categoryKey, categoryName, algorithmKey, algorithmName, files }) => ({
    algorithm: { categoryKey, algorithmKey },
    titles: [categoryName, algorithmName],
    files,
  })
);
const setCurrentNavTab = createAction(`${prefix}/SET_CURRENT_NAVBAR_TAB`,(currentTab)=>({currentTab}))
const setEditingFile = createAction(`${prefix}/SET_EDITING_FILE`, (file) => ({
  file,
}));
const modifyTitle = createAction(`${prefix}/MODIFY_TITLE`, (title) => ({
  title,
}));
const addFile = createAction(`${prefix}/ADD_FILE`, (file) => ({ file }));
const renameFile = createAction(`${prefix}/RENAME_FILE`, (file, name) => ({
  file,
  name,
}));
const modifyFile = createAction(`${prefix}/MODIFY_FILE`, (file, content) => ({
  file,
  content,
}));
const deleteFile = createAction(`${prefix}/DELETE_FILE`, (file) => ({ file }));

export const actions = {
  setHome,
  setAlgorithm,
  setEditingFile,
  modifyTitle,
  addFile,
  modifyFile,
  deleteFile,
  renameFile,
  setCurrentNavTab,
};

const homeTitles = ["Geeks Point"];
const homeFiles = [
  { name: README_MD.name, content: README_MD.content },
];
const defaultState = {
  algorithm: {
    categoryKey: "algorithm-visualizer",
    algorithmKey: "home",
  },
  titles: homeTitles,
  files: homeFiles,
  lastTitles: homeTitles,
  lastFiles: homeFiles,
  editingFile: undefined,
  shouldBuild: true,
  saved: true,
  currentTab: 0,
};

export default handleActions(
  {
    [combineActions(setHome, setAlgorithm)]: (state, { payload }) => {
      const { algorithm, titles, files } = payload;
      return {
        ...state,
        algorithm,
        titles,
        files,
        lastTitles: titles,
        lastFiles: files,
        editingFile: undefined,
        shouldBuild: true,
        saved: true,
      };
    },
    [setEditingFile]: (state, { payload }) => {
      const { file } = payload;
      return {
        ...state,
        editingFile: file,
        shouldBuild: true,
      };
    },
    [setCurrentNavTab]: (state, { payload }) => {
      const { currentTab } = payload;
      return {
        ...state,
        currentTab: currentTab,
      };
    },
    [modifyTitle]: (state, { payload }) => {
      const { title } = payload;
      const newState = {
        ...state,
        titles: [state.titles[0], title],
      };
      return {
        ...newState,
        saved: isSaved(newState),
      };
    },
    [addFile]: (state, { payload }) => {
      const { file } = payload;
      const newState = {
        ...state,
        files: [...state.files, file],
        editingFile: file,
        shouldBuild: true,
      };
      return {
        ...newState,
        saved: isSaved(newState),
      };
    },
    [combineActions(renameFile, modifyFile)]: (state, { payload }) => {
      const { file, ...update } = payload;
      const editingFile = { ...file, ...update };
      const newState = {
        ...state,
        files: state.files.map((oldFile) =>
          oldFile === file ? editingFile : oldFile
        ),
        editingFile,
        shouldBuild: extension(editingFile.name) === "md",
      };
      return {
        ...newState,
        saved: isSaved(newState),
      };
    },
    [deleteFile]: (state, { payload }) => {
      const { file } = payload;
      const index = state.files.indexOf(file);
      const files = state.files.filter((oldFile) => oldFile !== file);
      const editingFile = files[Math.min(index, files.length - 1)];
      const newState = {
        ...state,
        files,
        editingFile,
        shouldBuild: true,
      };
      return {
        ...newState,
        saved: isSaved(newState),
      };
    },
  },
  defaultState
);
