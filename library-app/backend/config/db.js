const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect...");
    console.log("URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.log("❌ Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;