import mongoose from "mongoose";

const boardSchema = mongoose.Schema({
  title: { type: String },
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lists",
    },
  ],
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
