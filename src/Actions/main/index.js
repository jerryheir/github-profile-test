import axiosOrders from "Utils/axios-orders";
import * as actionTypes from "../types";

const axios = axiosOrders();

export const getSearchResults = (text, page) => async (dispatch, getState) => {
  try {
    const { results } = getState().main;
    if (!text) return;
    const { data, status } = await axios.get(
      `search/users?q=${text}&page=${page ? page : 1}`
    );
    if (data && data.items) {
      dispatch({
        type: actionTypes.GET_SEARCH_RESULTS,
        payload: page && page > 1 ? [...results, ...data.items] : data.items,
      });
      return { status: data.status, data: status };
    } else {
      dispatch({
        type: actionTypes.GET_SEARCH_RESULTS,
        payload: page && page > 1 ? results : [],
      });
    }
    return { status: data.status, data: status, message: data.message };
  } catch (err) {
    if (!page || page <= 1) {
      dispatch({
        type: actionTypes.GET_SEARCH_RESULTS,
        payload: [],
      });
    }
    return {
      status: "error",
      data: err.response.status,
      message: err.response.data.message,
    };
  }
};
