const express = require("express");
const router = express.Router();

const Return = require("../models/Return");

router.get("/", async (req, res) => {
  const data = await Return.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const returnedBook = new Return(req.body);
  await returnedBook.save();

  res.json(returnedBook);
});

module.exports = router;