import http from "http";
import app from "./app.js";
import { initializeSocket } from "./socket.js";

const server = http.createServer(app);

initializeSocket(server);

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port", process.env.PORT || 8080);
});
