import {
  joinGame,
  getGame,
  startGame,
  rollDice,
  answerQuestion,
  setProfessor,
  getCard,
  getProfessor,
  acceptCard,
} from "../cache/game.js";

export default async function (fastify, opts) {
  fastify.ready((err) => {
    if (err) throw err;

    fastify.io.on("connection", async (socket) => {
      const game = await getGame();
      const card = await getCard();
      const professor = await getProfessor();
      fastify.io.emit("game", game);
      fastify.io.emit("card", card);
      fastify.io.emit("professor", professor);

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
        fastify.io.of("/").emit("card", null);
        fastify.io.of("/").emit("professor", "");
      });

      socket.on("needProfessor", async (value) => {
        await setProfessor(value);
        fastify.io.of("/").emit("professor", value);
      });

      socket.on("acceptCard", async () => {
        const game = await acceptCard();
        fastify.io.of("/").emit("game", game);
        fastify.io.of("/").emit("card", null);
      });
    });
  });
}
