import { cleanEnv, num, str, url } from "envalid";
import "dotenv/config";

export const env = cleanEnv(process.env, {
  PAYER_PRIVATE_KEY: str(),
  RPC_URL: url(),
  PORT: num({
    default: 3000,
  }),
});
