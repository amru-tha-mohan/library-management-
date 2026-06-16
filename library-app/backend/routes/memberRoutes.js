const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

router.get("/", async (req, res) => {
  const data = await Member.find();
  res.json(data);
});

router.post("/", async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.json(member);
});
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Member Deleted"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedMember =
      await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(updatedMember);

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
module.exports = router;