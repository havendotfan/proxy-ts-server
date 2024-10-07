import { FastifyInstance } from "fastify";

import { createCompressedTokenMintHandler } from "@/controllers";

export const initRoutes = (fastify: FastifyInstance, _options: any) => {
  fastify.post("/zk/create-token-mint", createCompressedTokenMintHandler);
};
