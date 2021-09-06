import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { addBoard, getBoards } from "../../actions/board";
import { useDispatch, useSelector } from "react-redux";

import "./home.css";

const Home = () => {
  const [title, setTitle] = useState("");
  const [openCreateBoard, setOpenCreateBoard] = useState(false);

  const boardStore = useSelector((state) => state.boardStore);
  const { boards } = boardStore;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  const openCreateBoardHandler = () => {
    setOpenCreateBoard(!openCreateBoard);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(addBoard({ title }));
  };

  return (
    <div className="create-board-place">
      <img
        className="home-image"
        src="https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      />
      <div>
        <div className="greeting-and-create-container">
          <div className="greeting-title">Welcome to e-Kanban!</div>
        </div>
        {boards.length < 15 ? (
          <>
            <div className="open-create-board-button-container">
              <button
                className="open-create-board-button"
                onClick={openCreateBoardHandler}
              >
                Create new board
              </button>
            </div>
            {openCreateBoard && (
              <form onSubmit={submitHandler} className="create-board-form">
                <input
                  type="text"
                  value={title}
                  maxLength="42"
                  required
                  className="create-board-input"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter board title..."
                />
                <button className="create-board-button" type="submit">
                  Create
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="alert-text">
            Number of boards have reached maximum of 15.
          </div>
        )}
      </div>
      <div className="board-link-container">
        {boards.map((board) => (
          <Link
            key={board._id}
            to={`/board/${board._id}`}
            className="board-link"
          >
            <div className="home-board-title">{board.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
