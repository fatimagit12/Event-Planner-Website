const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const messageRouter = require("./Router/messageRouter.js");
const authRouter = require("./Router/authRouter.js");

//const { Message } = require("./models/messageSchema.js");

const app = express();

dotenv.config({ path: "./Config/config.env" });

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["POST"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRouter);
app.use('/api/v1/auth', authRouter);

connectDB();

module.exports = app;
