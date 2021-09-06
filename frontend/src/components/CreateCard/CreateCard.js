import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addCard } from "../../actions/card";

import PropTypes from "prop-types";

import "./createcard.css";

const CreateCardForm = ({ listId, setAdding }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
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

  return (
    <form onSubmit={submitHandler}>
      <div className="create-card-input">
        <label className="create-card-input-label">
          Enter title for this card *
        </label>
        <div>
          <textarea
            required
            autoFocus
            value={title}
            className="create-card-input-textarea"
            onChange={(e) => changeHandler(e)}
            onKeyPress={(e) => e.key === "Enter" && submitHandler(e)}
          />
        </div>
      </div>
      <button className="card-add-button" type="submit">
        Add Card
      </button>
      <button
        className="card-close-button"
        onClick={() => {
          setAdding(false);
          setTitle("");
        }}
      >
        <i className="fa fa-times fa-lg"></i>
      </button>
    </form>
  );
};

CreateCardForm.propTypes = {
  listId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;
