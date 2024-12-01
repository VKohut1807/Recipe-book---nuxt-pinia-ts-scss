import { defineEventHandler, readBody } from "h3";
import { registerUser } from "@/server/controllers/auth.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await registerUser(body);
});
