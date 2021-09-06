import axios from "axios";
import {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  RENAME_BOARD,
  BOARD_ERROR,
  CLEAR_BOARD,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getBoards = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOARD });

    const { data } = await axios.get(`${baseUrl}/api/boards`);

    dispatch({
      type: GET_BOARDS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const getBoard = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/boards/${id}`);

    if (data) {
      axios.defaults.headers.common["boardId"] = id;
    } else {
      delete axios.defaults.headers.common["boardId"];
    }

    dispatch({
      type: GET_BOARD,
      payload: { ...data, listItems: [], cardItems: [] },
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addBoard = (board) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${baseUrl}/api/boards`, board);

    dispatch({
      type: ADD_BOARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const renameBoard = (boardId, board) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${baseUrl}/api/boards/rename/${boardId}`,
      board
    );

    dispatch({
      type: RENAME_BOARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};
