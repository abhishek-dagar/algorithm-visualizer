import { combineActions, createAction, handleActions } from 'redux-actions';

const prefix = 'DIRECTORY';

const setCategories = createAction(`${prefix}/SET_CATEGORIES`, categories => ({ categories }));

export const actions = {
  setCategories,
};

const defaultState = {
  categories: [],
};

export default handleActions({
  [combineActions(
    setCategories,
  )]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, defaultState);
