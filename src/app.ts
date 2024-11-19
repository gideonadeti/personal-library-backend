import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import indexRouter from "./routes/index";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use("/api", indexRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

// Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
});

export default app;
