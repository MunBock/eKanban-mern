import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { renameList } from "../../actions/list";

import PropTypes from "prop-types";

import "./listtitle.css";

const ListTitle = ({ list }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(renameList(list._id, { title }));
    setEditing(false);
  };

  const resizeInputHandler = (element) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = "auto";
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const changeHandler = (e) => {
    setTitle(e.target.value);
    resizeInputHandler(e);
  };

  const focusHandler = (e) => {
    resizeInputHandler(e);

    // Move text cursor to the end of text
    e.currentTarget.setSelectionRange(
      e.currentTarget.value.length,
      e.currentTarget.value.length
    );
  };

  return !editing ? (
    <div className="list-title-container">
      <div className="list-title">{list.title}</div>
      <div className="list-edit-button" onClick={() => setEditing(true)}>
        <i className="fa fa-pencil fa-lg"></i>
      </div>
    </div>
  ) : (
    <form onSubmit={submitHandler}>
      <textarea
        required
        autoFocus
        value={title}
        className="rename-input-textarea"
        onChange={(e) => changeHandler(e)}
        onBlur={(e) => submitHandler(e)}
        onFocus={(e) => focusHandler(e)}
        onKeyPress={(e) => e.key === "Enter" && submitHandler(e)}
      />
    </form>
  );
};

ListTitle.propTypes = {
  list: PropTypes.object.isRequired,
};

export default ListTitle;
