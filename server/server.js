const http = require("http");
const express = require("express");
const next = require("next");
const port = process.env.PORT || 4000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.text());
  server.use(express.json());
  server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  const apiroute = require("./Routes/APIrouter.router");
  server.use("/api", apiroute);
  server.get("*", (req, res) => {
    handle(req, res);
  });
  const httpServer = http.createServer(server);
  httpServer.listen(port);
  console.info(`http: listening on port http://localhost:${port}`);
});
