import express from "express";
import Board from "../models/board.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();

    res.status(200).json(boards);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    res.status(200).json(board);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    const newBoard = new Board({ title });
    const board = await newBoard.save();

    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/rename/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    board.title = req.body.title;
    await board.save();

    res.status(200).json(board);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
