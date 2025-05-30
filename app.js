import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

//connect to database
connectDB();

// routes
import userRoutes from "./src/routes/user.routes.js";
import captionRoutes from "./src/routes/caption.routes.js";
import rideRoutes from "./src/routes/ride.routes.js";
import mapRoutes from "./src/routes/map.routes.js";

app.use("/api/user", userRoutes);
app.use("/api/ride", rideRoutes);
app.use("/api/caption", captionRoutes);
app.use("/api/map", mapRoutes);

export default app;
