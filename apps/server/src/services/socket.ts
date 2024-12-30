import { Server } from "socket.io";

class SocketService {
  private _io: Server;
  constructor() {
    this._io = new Server();
  }

  get io() {
    return this._io;
  }

  public initListners() {
    const io = this._io;
    io.on("connection", (socket) => {
      console.log(`New Socket Connection with id: ${socket.id}`);

      socket.on("message", async ({ message }: { message: string }) => {
        console.log("Message:", message);
      });

      socket.on("disconnect", (reason) => {
        console.log(`Socket disconnected with id: ${socket.id}, reason: ${reason}`);
      });
    });
  }
}

export default SocketService;
