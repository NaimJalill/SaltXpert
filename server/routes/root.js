import {
  joinGame,
  getGame,
  startGame,
  rollDice,
  answerQuestion,
} from "../cache/game.js";

export default async function (fastify, opts) {
  fastify.ready((err) => {
    if (err) throw err;

    fastify.io.on("connection", async (socket) => {
      const game = await getGame();
      fastify.io.emit("game", game);

      console.log("connected");
      socket.on("disconnect", () => {
        console.log("disconnected");
      });

      socket.on("join", async (name) => {
        console.log("join", name);
        const { game, id } = await joinGame(name);
        socket.emit("joined", { name, id });
        fastify.io.of("/").emit("game", game);
      });

      socket.on("start", async () => {
        const game = await startGame();
        fastify.io.of("/").emit("game", game);
      });

      socket.on("roll", async (value) => {
        const { game, card } = await rollDice(value);
        fastify.io.of("/").emit("game", game);
        fastify.io.of("/").emit("card", card);
      });

      socket.on("answer", async (value) => {
        const game = await answerQuestion(value);
        fastify.io.of("/").emit("game", game);
      });

      socket.on("needProfessor", async (value) => {
        fastify.io.of("/").emit("professor", value);
      });
    });
  });
}
