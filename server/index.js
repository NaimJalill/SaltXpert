import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.get("/test", function (request, reply) {
  reply.send({
    status: "OK",
  });
});

app.register(import("./app.js"));

const start = async () => {
  try {
    const port = process.env.port || 8080;
    app.listen({ port, host: "0.0.0.0" }, () =>
      console.log("SERVER LISTENING AT PORT : " + port)
    );
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
