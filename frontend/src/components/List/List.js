import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { getList } from "../../actions/list";

import Card from "../Card/Card";
import CreateCard from "../CreateCard/CreateCard";
import ListTitle from "../ListTitle/ListTitle";

import "./list.css";

const TrelloList = ({ listId, index }) => {
  const [addingCard, setAddingCard] = useState(false);

  const boardStore = useSelector((state) => state.boardStore);
  const { board } = boardStore;
  const { listItems } = board;
  const list = listItems.find((object) => object._id === listId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  return !list ? (
    ""
  ) : (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="list-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ListTitle list={list} />
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <>
                <div
                  className="list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      list={list}
                    />
                  ))}
                  {provided.placeholder}
                  {addingCard && (
                    <CreateCard listId={listId} setAdding={setAddingCard} />
                  )}
                </div>
              </>
            )}
          </Droppable>

          {!addingCard && (
            <div>
              <button
                className="card-add-button-open"
                onClick={() => setAddingCard(true)}
              >
                + Add a card
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
