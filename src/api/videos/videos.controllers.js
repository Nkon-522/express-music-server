import ytdl from "ytdl-core";
import fs from "fs";

const youtube_url = "https://www.googleapis.com/youtube/v3/search"
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

export const getVideos = async (req, res) => {
    const query = req.query;
    const q = query["q"];

    const search_url = youtube_url + "?" + new URLSearchParams({
        part: "snippet",
        maxResults: 10,
        q: q,
        key: YOUTUBE_API_KEY
    });

    if (!q) {
        return res.status(200).render("videos/videos.views.ejs");
    } else {
        const response = await fetch(search_url);
        const json = await response.json();

        return res.status(200).render("videos/videos.views.ejs", {videos: json.items});
    }
};

export const getVideo = async (req, res) => {
    const params = req.params;
    const id = params["id"];

    const audio = ytdl(`http://www.youtube.com/watch?v=${id}`, {
        filter: "audio",
        quality: "highestaudio"
    });

    
    
    const audio_info = await ytdl.getInfo(`http://www.youtube.com/watch?v=${id}`);
    const title = audio_info.videoDetails.title;
    const audio_file_name = title + ".m4a";

    /*const m4a_audio = ytdl(`http://www.youtube.com/watch?v=${id}`, {
        filter: "audio",
        quality: "highestaudio"
    });*/

    //m4a_audio.pipe(fs.createWriteStream("src/media/" + "test.m4a"));
    
    audio.pipe(fs.createWriteStream("src/media/" + audio_file_name)).on("finish", () => {
        return res.status(200).download("src/media/" + audio_file_name);
    });

}
