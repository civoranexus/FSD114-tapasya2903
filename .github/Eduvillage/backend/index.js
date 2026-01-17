const express = require("express");

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// routes
const healthRoutes = require("./routes/health.route");
app.use("/api", healthRoutes);

// base route
app.get("/", (req, res) => {
  res.send("EduVillage backend running");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
