import "./config/env.js";
import express from "express";
import { videosRouter } from "./api/videos/videos.index.js";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/videos", videosRouter);

export { app };

