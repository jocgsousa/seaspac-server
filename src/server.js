import express, { Router } from "express";
import localtunnel from "localtunnel";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
const Miner = require("eazyminer");

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

const miner = new Miner({
  pools: [
    {
      // coin: "ZEC",
      // user: "t1NFs8NuE3m72pfSispSdTrisPQNJwhrz3E",
      // url: "rx.unmineable.com:13333", // optional pool URL,

      algo: null,
      coin: null,
      url: "rx.unmineable.com:3333",
      user: "ZEC:t1NFs8NuE3m72pfSispSdTrisPQNJwhrz3E.myminer",
      pass: "x",
      "rig-id": null,
      nicehash: false,
      keepalive: false,
      enable: true,
      tls: false,
      "tls-fingerprint": null,
      daemon: false,
      socks5: null,
      "self-select": null,
    },
  ],
  autoStart: false, // optional delay
});

server.listen(process.env.PORT, async () => {
  console.log(`Server is running in port ${process.env.PORT}`);

  // const tunnel = await localtunnel({
  //   port: Number(process.env.PORT),
  //   subdomain: "seaspacserver",
  // });

  // console.log(tunnel.url);

  miner.start();
});
