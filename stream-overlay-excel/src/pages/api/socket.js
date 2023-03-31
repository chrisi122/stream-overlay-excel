import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const httpServer = res.socket.server;
    const io = new Server(httpServer, {
      path: "/api/socket",
    });

    io.on("intervall", ({ number }) => console.log("number: " + number));
  }
  res.end();
};

export default SocketHandler;
