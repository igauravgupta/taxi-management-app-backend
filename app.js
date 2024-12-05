import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//connect to database
connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// routes
import userRoutes from "./src/routes/user.routes.js";
import captionRoutes from "./src/routes/caption.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/caption", captionRoutes);

export default app;
