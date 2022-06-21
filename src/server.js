import express, { Router } from "express";
import localtunnel from "localtunnel";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import "dotenv/config";

// Init connection DATABASE

import "./database";

// CONTROLLERS
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import DepartamentoController from "./app/controllers/DepartamentoController";

// MIDDLEWARES
import authMiddleware from "./app/middlewares/auth";
import SectionsController from "./app/controllers/SectionsController";
import FormController from "./app/controllers/FormController";
import FormDataController from "./app/controllers/FormDataController";

const app = express();
app.use(express.json());
app.use(cors());

const routes = new Router();

// ROUTES =====================================================================
// ROUTES =====================================================================

routes.get("/", (req, res) =>
  res.json({ message: "route default is running..." })
);

// SESSÕES
routes.post("/session", SessionController.store);

routes.use(authMiddleware);
// REGISTRO DE USUARIOS
routes.post("/user", UserController.store);
routes.put("/user/:id", UserController.update);
routes.get("/user", UserController.index);
// Departamento
routes.post("/departamento", DepartamentoController.store);
routes.put("/departamento/:id", DepartamentoController.update);
routes.delete("/departamento/:id", DepartamentoController.delete);
routes.get("/departamento", DepartamentoController.index);

// Seções
routes.post("/section", SectionsController.store);
routes.put("/section/:id", SectionsController.update);
routes.delete("/section/:id", SectionsController.delete);
routes.get("/section", SectionsController.index);

// Modelo de formulário
routes.post("/form", FormController.store);
routes.put("/form/:id", FormController.update);
routes.delete("/form/:id", FormController.delete);
routes.get("/form/:id", FormController.index);

// Registro de formulários
routes.post("/form-data", FormDataController.store);
routes.put("/form-data/:id", FormDataController.update);
routes.delete("/form-data/:id", FormDataController.delete);
routes.get("/form-data/:id", FormDataController.index);
// ROUTES =====================================================================
// ROUTES =====================================================================

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
