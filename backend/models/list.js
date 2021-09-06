import mongoose from "mongoose";

const listSchema = mongoose.Schema({
  title: { type: String },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cards",
    },
  ],
});

const List = mongoose.model("List", listSchema);

export default List;
