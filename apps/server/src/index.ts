import http from "http";
import express from "express";
import cors from "cors";
import "dotenv/config";
import SocketService from "./services/socket";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";

async function init() {
  const app = express();
  const socketService = new SocketService();

  const server = http.createServer(app);
  const PORT = process.env.PORT ?? 8000;

  socketService.io.attach(server);

  app.use(
    cors({
      origin: ["http://localhost:3001","http://localhost:3000"],
      methods: ["GET", "POST", "PUT"],
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);

  server.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
  });
}

init();
