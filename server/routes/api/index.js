import {
  joinGame,
  startGame,
  rollDice,
  answerQuestion,
  acceptCard,
  setProfessor,
  getGame,
  clearSide,
  skipQuestion,
  endGame,
} from "../../cache/game.js";
import { setTimeout } from "timers/promises";

export default async function (fastify, opts) {
  fastify.post("/join", async function (request, reply) {
    const { name } = request.body;
    const { id, game } = await joinGame(name);
    fastify.io.of("/").emit("game", game);
    reply.send({ id });
  });

  fastify.post("/start", async function (request, reply) {
    const game = await startGame();
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/roll", async function (request, reply) {
    const { value } = request.body;
    const { game, position } = await rollDice(value);
    fastify.io.of("/").emit("game", game);

    if (game.winner.length > 0) {
      return;
    }

    if (
      position !== "Penalty" &&
      position !== "Chance" &&
      position !== "Note" &&
      position !== "Tutorial" &&
      position !== "Salt Lab" &&
      position !== "Start"
    ) {
      const count = game.count;
      await setTimeout(180000);
      const checkGame = await getGame();
      if (checkGame.count === count) {
        const nextGame = await answerQuestion("No");
        fastify.io.of("/").emit("game", nextGame);
      }
    } else if (position === "Tutorial") {
      await setTimeout(60000);
      const nextGame = await clearSide();
      fastify.io.of("/").emit("game", nextGame);
    }
  });

  fastify.post("/clear", async function (request, reply) {
    const game = await clearSide();
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/skip", async function (request, reply) {
    const game = await skipQuestion();
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/answer", async function (request, reply) {
    const { answer } = request.body;
    const game = await answerQuestion(answer);
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/accept", async function (request, reply) {
    const game = await acceptCard();
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/professor", async function (request, reply) {
    const { answer } = request.body;
    const game = await setProfessor(answer);
    fastify.io.of("/").emit("game", game);
  });

  fastify.post("/end", async function (request, reply) {
    const game = await endGame();
    fastify.io.of("/").emit("game", game);
  });
}
