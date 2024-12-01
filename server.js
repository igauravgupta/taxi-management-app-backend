import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 3000");
});
