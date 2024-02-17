import { getGame } from "../cache/game.js";

export default async function (fastify, opts) {
  fastify.ready((err) => {
    fastify.io.on("connection", async (socket) => {
      const game = await getGame();
      socket.emit("game", game);
    });
  });
}
