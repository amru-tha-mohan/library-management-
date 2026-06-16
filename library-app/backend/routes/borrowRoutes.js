const express = require("express");
const router = express.Router();
const Borrow = require("../models/Borrow");

router.get("/", async (req, res) => {
  const data = await Borrow.find();
  res.json(data);
});

  router.post("/", async (req, res) => {
  try {
    console.log("POST ROUTE HIT");

    const issueDate = new Date(req.body.dateTime);

    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 7);

    console.log(returnDate);

    const borrow = new Borrow({
      ...req.body,
      returnDate: returnDate.toISOString().split("T")[0]
    });

    await borrow.save();
    res.status(201).json(borrow);

  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Borrow.findByIdAndDelete(req.params.id);

    res.json({
      message: "Borrow Record Deleted"
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
module.exports = router;