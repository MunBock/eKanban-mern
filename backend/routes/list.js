import express from "express";
import Board from "../models/board.js";
import List from "../models/list.js";

const router = express.Router();

router.get("/boardLists/:boardId", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    const lists = [];
    for (const listId of board.lists) {
      lists.push(await List.findById(listId));
    }

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    res.status(200).json(list);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const boardId = req.header("boardId");

    const newList = new List({ title });
    const list = await newList.save();

    const board = await Board.findById(boardId);
    board.lists.push(list.id);

    await board.save();

    res.status(200).json(list);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/rename/:id", async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    list.title = req.body.title;
    await list.save();

    res.status(200).json(list);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/move/:id", async (req, res) => {
  try {
    const toIndex = req.body.toIndex ? req.body.toIndex : 0;
    const boardId = req.header("boardId");
    const board = await Board.findById(boardId);
    const listId = req.params.id;
    if (!listId) {
      return res.status(404).json({ msg: "List not found" });
    }

    board.lists.splice(board.lists.indexOf(listId), 1);
    board.lists.splice(toIndex, 0, listId);
    await board.save();

    res.status(200).send(board.lists);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
