import express from "express";
import { getVideos, getVideo } from "./videos.controllers.js";

export const videosRouter = express.Router();

videosRouter.get("/", getVideos);
videosRouter.get("/:id", getVideo);

/*
videosRouter.post("/", createVideo);
videosRouter.put("/:id", updateVideo);
videosRouter.delete("/:id", deleteVideo);
*/