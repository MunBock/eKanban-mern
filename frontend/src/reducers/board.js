import {
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  RENAME_BOARD,
  BOARD_ERROR,
  CLEAR_BOARD,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  MOVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  DELETE_CARD,
  MOVE_CARD,
  DRAG_ITEM,
} from "../constants/index";

const initialState = {
  boards: [],
  board: null,
  error: {},
};

export const boardReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_BOARD:
      return {
        ...state,
        board: null,
      };
    case GET_BOARDS:
      return {
        ...state,
        boards: payload,
      };
    case GET_BOARD:
      return {
        ...state,
        board: { ...state.board, ...payload },
      };
    case ADD_BOARD:
      return {
        ...state,
        boards: [payload, ...state.boards],
      };
    case RENAME_BOARD:
      return {
        ...state,
        board: { ...state.board, ...payload },
      };
    case BOARD_ERROR:
      return {
        ...state,
        error: payload,
      };
    case GET_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listItems: [...state.board.listItems, payload],
        },
      };
    case ADD_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          lists: [...state.board.lists, payload._id],
        },
      };
    case RENAME_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          listItems: state.board.listItems.map((list) =>
            list._id === payload._id ? payload : list
          ),
        },
      };
    case MOVE_LIST:
      return {
        ...state,
        board: {
          ...state.board,
          lists: payload,
        },
      };
    case GET_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardItems: [...state.board.cardItems, payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          listItems: state.board.listItems.map((list) =>
            list._id === payload.listId
              ? { ...list, cards: [...list.cards, payload.cardId] }
              : list
          ),
        },
      };
    case EDIT_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardItems: state.board.cardItems.map((card) =>
            card._id === payload._id ? payload : card
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          cardItems: state.board.cardItems.filter(
            (card) => card._id !== payload
          ),
          listItems: state.board.listItems.map((list) =>
            list.cards.includes(payload)
              ? {
                  ...list,
                  cards: list.cards.filter((card) => card !== payload),
                }
              : list
          ),
        },
      };
    case MOVE_CARD:
      return {
        ...state,
        board: {
          ...state.board,
          listItems: state.board.listItems.map((list) =>
            list._id === payload.from._id
              ? payload.from
              : list._id === payload.to._id
              ? payload.to
              : list
          ),
          cardItems: state.board.cardItems.filter(
            (card) =>
              card._id !== payload.cardId || payload.to._id === payload.from._id
          ),
        },
      };
    case DRAG_ITEM:
      const {
        sourceListId,
        destinationListId,
        oldCardIndex,
        newCardIndex,
        type,
      } = action.payload;

      // drag list
      if (type === "list") {
        const newLists = state.board.lists;
        const draggedList = newLists.splice(oldCardIndex, 1);
        newLists.splice(newCardIndex, 0, ...draggedList);
        state.board.lists = newLists;

        return state;
      }

      // drag card in the same list
      if (sourceListId === destinationListId) {
        const list = state.board.listItems.filter(
          (data) => data._id === sourceListId
        );
        const [{ cards }] = list;
        const card = cards.splice(oldCardIndex, 1);
        cards.splice(newCardIndex, 0, ...card);
        return { ...state, [sourceListId]: list };
      }

      // drag card from one to other list
      if (sourceListId !== destinationListId) {
        const sourceList = state.board.listItems.filter(
          (data) => data._id === sourceListId
        );
        const [{ cards: sourceCards }] = sourceList;
        const card = sourceCards.splice(oldCardIndex, 1);
        const destinationList = state.board.listItems.filter(
          (data) => data._id === destinationListId
        );
        const [{ cards }] = destinationList;
        cards.splice(newCardIndex, 0, ...card);
        return {
          ...state,
          [sourceListId]: sourceList,
          [destinationListId]: destinationList,
        };
      }
      return state;
    default:
      return state;
  }
};
