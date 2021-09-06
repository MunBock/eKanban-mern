import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import { getCard, editCard, deleteCard } from "../../actions/card";

import "./card.css";

const TrelloCard = ({ cardId, list, index }) => {
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [hovering, setHovering] = useState(false);

  const boardStore = useSelector((state) => state.boardStore);
  const { board } = boardStore;
  const { cardItems } = board;
  const card = cardItems.find((object) => object._id === cardId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (card) {
      setTitle(card.title);
    }
    dispatch(getCard(cardId));
  }, [dispatch, cardId, card]);

  const saveCard = (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title }));
    setEditing(false);
  };

  const deleteCardHandler = () => {
    dispatch(deleteCard(list._id, cardId));
  };

  const handleClose = () => {
    setEditing(false);
  };

  const resizeInputHandler = (element) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const focusHandler = (e) => {
    resizeInputHandler(e);

    // Move text cursor to the end of text
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
  };

  const changeHandler = (e) => {
    setTitle(e.target.value);
    resizeInputHandler(e);
  };

  const mouseEnterHandler = () => {
    setHovering(true);
  };

  const mouseLeaveHandler = () => {
    setHovering(false);
  };

  return !card ? (
    ""
  ) : (
    <>
      {!editing ? (
        <Draggable draggableId={cardId} index={index} list={list}>
          {(provided) => (
            <div
              className="card-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
              onDoubleClick={() => setEditing(true)}
            >
              <div className="card">
                <i
                  className={
                    hovering
                      ? "fa fa-pencil fa-lg card-edit-button active"
                      : "fa fa-pencil fa-lg card-edit-button"
                  }
                  onClick={() => setEditing(true)}
                ></i>
                <i
                  className={
                    hovering
                      ? "fa fa-trash fa-lg card-delete-button active"
                      : "fa fa-trash fa-lg card-delete-button"
                  }
                  onClick={deleteCardHandler}
                ></i>
                <div className="card-content">
                  <div className="card-title">{card.title}</div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : (
        <form onSubmit={saveCard}>
          <div className="edit-card-input">
            <label className="edit-card-input-label">
              Edit title for this card *
            </label>
            <textarea
              required
              value={title}
              autoFocus
              className="edit-card-input-textarea"
              onFocus={(e) => focusHandler(e)}
              onChange={(e) => changeHandler(e)}
              onKeyPress={(e) => e.key === "Enter" && saveCard(e)}
            />
          </div>
          <button type="submit" className="card-save-button">
            Save
          </button>
          <button className="card-close-button" onClick={handleClose}>
            <i className="fa fa-times fa-lg"></i>
          </button>
        </form>
      )}
    </>
  );
};

export default TrelloCard;
