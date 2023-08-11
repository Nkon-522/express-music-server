import { app } from "./app.js";
import localtunnel from "localtunnel";

const port = process.env.PORT || 3000;

let server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    }
);

const tunnel = await localtunnel({ port: port, subdomain: "youtube-search-clone" });

console.log(`Tunnel URL: ${tunnel.url}`);

tunnel.on("close", () => {
    console.log("Tunnel closed");
    server.close();
});