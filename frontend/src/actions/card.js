import axios from "axios";
import {
  BOARD_ERROR,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
} from "../constants/index";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getCard = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${baseUrl}/api/cards/${id}`);

    dispatch({
      type: GET_CARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const addCard =
  ({ title, listId }) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(`${baseUrl}/api/cards`, {
        title,
        listId,
      });

      dispatch({
        type: ADD_CARD,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOARD_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const editCard = (cardId, card) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${baseUrl}/api/cards/edit/${cardId}`,
      card
    );

    dispatch({
      type: EDIT_CARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `${baseUrl}/api/cards/${listId}/${cardId}`
    );

    dispatch({
      type: DELETE_CARD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};

export const moveCard = (cardId, card) => async (dispatch) => {
  try {
    const { data } = await axios.patch(
      `${baseUrl}/api/cards/move/${cardId}`,
      card
    );

    console.log(data);
  } catch (error) {
    dispatch({
      type: BOARD_ERROR,
      payload: error.response.data.message,
    });
  }
};
