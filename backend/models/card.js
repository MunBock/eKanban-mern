import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
  title: { type: String },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
