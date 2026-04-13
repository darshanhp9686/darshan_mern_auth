require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(cors()); // CORS middleware
app.use(express.json()); // JSON middleware

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

app.use(errorHandler); // error middleware

app.listen(5000, () => {
    console.log("Server running on port 5000");
});