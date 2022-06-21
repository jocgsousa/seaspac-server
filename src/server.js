import express, { Router } from "express";
import localtunnel from "localtunnel";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";

import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());

const routes = new Router();

routes.get("/", (req, res) => res.json({ message: "Hello World" }));

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    optionsSuccessStatus: "200",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected socket.io id is${socket.id}`);

  socket.on("connect", () => {});

  socket.on("disconnect", () => {
    console.log(`User disconnected socket.io id is${socket.id}`);
  });
});

app.use(routes);

server.listen(process.env.PORT, async () => {
  console.log(`Server is running in port ${process.env.PORT}`);

  // const tunnel = await localtunnel({
  //   port: Number(process.env.PORT),
  //   subdomain: "seaspacserver",
  // });

  // console.log(tunnel.url);
});
