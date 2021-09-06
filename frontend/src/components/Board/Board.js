import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { getBoard } from "../../actions/board";
import { moveList, drag } from "../../actions/list";
import { moveCard } from "../../actions/card";

import List from "../List/List";
import CreateList from "../CreateList/CreateList";
import BoardTitle from "../BoardTitle/BoardTitle";
import Loader from "../Loader/Loader";

import "./board.css";

const TrelloBoard = ({ match }) => {
  const { id } = match.params;
  const boardStore = useSelector((state) => state.boardStore);
  const { board } = boardStore;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    dispatch(
      drag(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );

    if (type === "card") {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Loader />
  ) : (
    <>
      <img
        className="board-image"
        src={
          "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      />
      <div className="board-container">
        <Link to="/" className="go-back-link">
          Go back
        </Link>
        <BoardTitle board={board} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="lists-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
};

export default TrelloBoard;
