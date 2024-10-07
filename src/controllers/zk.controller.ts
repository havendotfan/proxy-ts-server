import { Keypair, PublicKey } from "@solana/web3.js";
import { createRpc } from "@lightprotocol/stateless.js";
import { createMint, mintTo } from "@lightprotocol/compressed-token";
import base58 from "bs58";
import type { FastifyReply, FastifyRequest } from "fastify";

import { env } from "@/constants";

export const createCompressedTokenMintHandler = async (
  _req: FastifyRequest,
  res: FastifyReply
) => {
  try {
    const payer = Keypair.fromSecretKey(base58.decode(env.PAYER_PRIVATE_KEY));
    const connection = createRpc(env.RPC_URL, env.RPC_URL, env.RPC_URL, {
      commitment: "processed",
    });

    const { mint, transactionSignature } = await createMint(
      connection,
      payer,
      payer.publicKey,
      9
    );

    return res.status(200).send({
      data: {
        mint,
        signature: transactionSignature,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "internal server error",
    });
  }
};

export const mintCompressedTokensToHandler = async (
  req: FastifyRequest<{
    Body: {
      wallet_address: string;
      mint: string;
      amount: number;
    };
  }>,
  res: FastifyReply
) => {
  try {
    const connection = createRpc(env.RPC_URL, env.RPC_URL, env.RPC_URL, {
      commitment: "processed",
    });
    const payer = Keypair.fromSecretKey(base58.decode(env.PAYER_PRIVATE_KEY));
    const to = new PublicKey(req.body.wallet_address);
    const mint = new PublicKey(req.body.mint);
    const amount = req.body.amount;

    const signature = await mintTo(
      connection,
      payer,
      mint,
      to,
      payer,
      amount * (10 ^ 9)
    );

    return res.status(200).send({
      data: {
        signature,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "internal server error",
    });
  }
};
