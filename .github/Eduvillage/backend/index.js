require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// connect database
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
const healthRoutes = require("./routes/health.route");
const userRoutes = require("./routes/user.route");
app.use("/api", healthRoutes);
app.use("/api/users", userRoutes);


// base route
app.get("/", (req, res) => {
  res.send("EduVillage backend running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
