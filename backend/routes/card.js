import express from "express";
import List from "../models/list.js";
import Card from "../models/card.js";

const router = express.Router();

router.get("/listCards/:listId", async (req, res) => {
  try {
    const list = await List.findById(req.params.listId);
    if (!list) {
      return res.status(404).json({ msg: "List not found" });
    }

    const cards = [];
    for (const cardId of list.cards) {
      cards.push(await Card.findById(cardId));
    }

    res.status(200).json(cards);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    res.status(200).json(card);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, listId } = req.body;

    const newCard = new Card({ title });
    const card = await newCard.save();

    const list = await List.findById(listId);
    list.cards.push(card.id);
    await list.save();

    res.status(200).json({ cardId: card.id, listId });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/edit/:id", async (req, res) => {
  try {
    const { title } = req.body;
    if (title === "") {
      return res.status(400).json({ msg: "Title is required" });
    }

    const card = await Card.findById(req.params.id);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    card.title = title ? title : card.title;
    await card.save();

    res.status(200).json(card);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.delete("/:listId/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    const list = await List.findById(req.params.listId);
    if (!card || !list) {
      return res.status(404).json({ msg: "List/Card not found" });
    }

    list.cards.splice(list.cards.indexOf(req.params.id), 1);
    await list.save();
    await card.remove();

    res.json(req.params.id);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.patch("/move/:id", async (req, res) => {
  try {
    const { fromId, toId, toIndex } = req.body;

    const cardId = req.params.id;
    const from = await List.findById(fromId);
    let to = await List.findById(toId);
    if (!cardId || !from || !to) {
      return res.status(404).json({ msg: "List/card not found" });
    } else if (fromId === toId) {
      to = from;
    }

    const fromIndex = from.cards.indexOf(cardId);
    if (fromIndex !== -1) {
      from.cards.splice(fromIndex, 1);
      await from.save();
    }

    if (!to.cards.includes(cardId)) {
      if (toIndex === 0 || toIndex) {
        to.cards.splice(toIndex, 0, cardId);
      } else {
        to.cards.push(cardId);
      }
      await to.save();
    }

    res.status(200).send({ cardId, from, to });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

export default router;
