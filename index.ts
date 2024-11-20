#!/usr/bin/env node

import app from "./src/app";
import debug from "debug";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const logger = debug("personal-library-backend:server");
const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

let server = http.createServer(app);

function startServer(port: number) {
  server = http.createServer(app);

  server.listen(port);
  server.on("error", (error) => onError(error, port));
  server.on("listening", onListening);
}

startServer(port);

function normalizePort(val: string): number {
  const portNumber = parseInt(val, 10);

  if (isNaN(portNumber) || portNumber <= 0 || portNumber > 65535) {
    throw new Error("Invalid port number");
  }

  return portNumber;
}

function onError(error: NodeJS.ErrnoException, currentPort: number) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = `Port ${currentPort}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use. Trying next port...`);

      const nextPort = currentPort + 1;

      startServer(nextPort);

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
