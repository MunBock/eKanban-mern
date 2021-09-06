import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addList } from "../../actions/list";

import "./createlist.css";

const CreateList = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle("");
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

  return !adding ? (
    <div>
      <button className="list-add-button-open" onClick={() => setAdding(true)}>
        + Add a list
      </button>
    </div>
  ) : (
    <div>
      <form onSubmit={submitHandler}>
        <div className="create-list-input">
          <label className="create-list-input-label">
            Enter title for this list *
          </label>
          <textarea
            required
            autoFocus
            value={title}
            className="create-list-input-textarea"
            onChange={(e) => changeHandler(e)}
            onKeyPress={(e) => e.key === "Enter" && submitHandler(e)}
          />
        </div>
        <button className="list-add-button" type="submit">
          Add List
        </button>
        <button
          onClick={() => {
            setAdding(false);
            setTitle("");
          }}
          className="list-close-button"
        >
          <i className="fa fa-times fa-lg"></i>
        </button>
      </form>
    </div>
  );
};

export default CreateList;
