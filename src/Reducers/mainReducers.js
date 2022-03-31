import * as actionTypes from '../Actions/types';

const initialState = {
  results: [],
};

const mainReducers = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_SEARCH_RESULTS: {
      return {
        ...state,
        results: payload,
      };
    }
    default:
      return state;
  }
};

export default mainReducers;
