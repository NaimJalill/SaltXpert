import { io } from "socket.io-client";

const socket = io("https://server-saltxpert.koyeb.app", {
  transports: ["websocket"],
});

export default socket;
