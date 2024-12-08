import { defineEventHandler, readBody } from "h3";
import { loginUser } from "@/server/controllers/auth.controller";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return await loginUser(body);
});
