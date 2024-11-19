#!/usr/bin/env node

import app from "./src/app";
import debug from "debug";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const logger = debug("app:server");
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string) {
  const portNumber = parseInt(val, 10);
  if (isNaN(portNumber)) {
    return val; // named pipe
  }
  if (portNumber >= 0) {
    return portNumber; // port number
  }
  return false;
}

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  logger(`Listening on ${bind}`);
}
