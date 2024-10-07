import Fastify from "fastify";

import {
  createCompressedTokenMintHandler,
  mintCompressedTokensToHandler,
} from "@/controllers";
import { env } from "@/constants";

const fastify = Fastify();

fastify.get("/", (_, res) => {
  return res.status(200).send({
    message: "gm",
  });
});

const start = async () => {
  try {
    fastify.post("/zk/create-token-mint", createCompressedTokenMintHandler);
    fastify.post("/zk/mint", mintCompressedTokensToHandler);

    await fastify.listen({ port: env.PORT });
    console.log(`server is listening on port ${env.PORT}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();

export default fastify;
