import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
  res.socket.server.io.emit("intervall", req.body);
  res.end();
};

export default SocketHandler;
