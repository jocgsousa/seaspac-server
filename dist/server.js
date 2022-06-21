"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _localtunnel = require('localtunnel'); var _localtunnel2 = _interopRequireDefault(_localtunnel);
var _http = require('http');
var _socketio = require('socket.io');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

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

server.listen(process.env.PORT, async () => {
  console.log(`Server is running in port ${process.env.PORT}`);

  const tunnel = await _localtunnel2.default.call(void 0, {
    port: Number(process.env.PORT),
    subdomain: "seaspacserver",
  });

  console.log(tunnel.url);
});
