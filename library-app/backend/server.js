const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const returnRoutes = require("./routes/returnRoutes");
const memberRoutes = require("./routes/memberRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://library-management-tau-olive.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    console.log("✅ MongoDB Connected")
  )
  .catch((err) =>
    console.log(err)
  );
app.get("/", (req, res) => {
  res.send("Library Management Backend is Running 🚀");
});
app.listen(
  process.env.PORT || 5000,
  () => {
    console.log(
      "🚀 Server running on port 5000"
    );
  }
);