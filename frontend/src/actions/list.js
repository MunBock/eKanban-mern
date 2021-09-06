import axios from "axios";
import {
  BOARD_ERROR,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  DRAG_ITEM,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getList = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/lists/${id}`);

    dispatch({
      type: GET_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addList = (list) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/lists`, list);

    dispatch({
      type: ADD_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const renameList = (listId, list) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${baseUrl}/api/lists/rename/${listId}`,
      list
    );

    dispatch({
      type: RENAME_LIST,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const moveList = (listId, list) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${baseUrl}/api/lists/move/${listId}`,
      list
    );

    console.log(data);
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const drag = (
  sourceListId,
  destinationListId,
  oldCardIndex,
  newCardIndex,
  draggableId,
  type
) => {
  return (dispatch) => {
    dispatch({
      type: DRAG_ITEM,
      payload: {
        sourceListId,
        destinationListId,
        oldCardIndex,
        newCardIndex,
        draggableId,
        type,
      },
    });
  };
};
