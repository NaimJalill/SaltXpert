import { io } from "socket.io-client";

const socket = io("https://saltxpert-server.vercel.app");

export default socket;
