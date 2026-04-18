const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const apiRoutes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL ,
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "DocBackend API is running" });
});

app.use("/api", apiRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
