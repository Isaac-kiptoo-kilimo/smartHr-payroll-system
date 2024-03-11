import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from "./src/routes/usersRoutes.js";
import notificationRouter from "./src/routes/notificationRoutes.js";
import messageRouter from "./src/routes/messageRoutes.js";
import chatRouter from "./src/routes/chatMessageRoutes.js";

dotenv.config();

const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
const PORT = process.env.PORT || 4500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.use("/api", userRouter);
app.use("/api", notificationRouter);
app.use("/api", messageRouter);

app.use("/api", chatRouter);

app.listen(PORT, () => {
  console.log(`This app is running on port ${PORT}`);
});
