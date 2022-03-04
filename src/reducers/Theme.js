import { createAction, handleActions } from "redux-actions";

const prefix = "THEME";

const setTheme = createAction(`${prefix}/SET_THEME`, (Theme) => ({ Theme }));

export const actions = {
  setTheme,
};
const defaultState = {
  Theme: "Dark",
};
export default handleActions(
  {
    [setTheme]: (state, { payload }) => {
      const { Theme } = payload;
      return {
        ...state,
        Theme: Theme,
      };
    },
  },
  defaultState
);
