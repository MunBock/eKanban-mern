import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { renameBoard } from "../../actions/board";

import "./boardtitle.css";

const BoardTitle = ({ board }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(board.title);
  }, [board.title]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(renameBoard(board._id, { title }));
    setEditing(false);
  };

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const focusHandler = (e) => {
    // Move text cursor to the end of text
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
  };

  return !editing ? (
    <div className="board-title" onClick={() => setEditing(true)}>
      {board.title}
    </div>
  ) : (
    <form onSubmit={submitHandler}>
      <input
        required
        autoFocus
        value={title}
        maxLength="42"
        className="rename-board-input"
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => submitHandler(e)}
        onFocus={(e) => focusHandler(e)}
        onKeyPress={(e) => e.key === "Enter" && submitHandler(e)}
      />
    </form>
  );
};

BoardTitle.propTypes = {
  board: PropTypes.object.isRequired,
};

export default BoardTitle;
