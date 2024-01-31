import fp from "fastify-plugin";
import fastifySocket from "fastify-socket.io";

export default fp(async (fastify) => {
  fastify.register(fastifySocket, {
    cors: {
      origin: "*",
    },
    perMessageDeflate: false,
  });
});
