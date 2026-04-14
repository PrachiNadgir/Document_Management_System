const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");

dotenv.config();

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

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
