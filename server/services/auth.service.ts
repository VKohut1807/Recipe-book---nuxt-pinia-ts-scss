import db from "@/db";
import { registerUserMutation } from "@/db/mutations/register-user";

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  const userExists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (userExists) {
    throw new Error("User with this email already exists");
  }

  const user = await registerUserMutation(email, username, password);

  return user;
};
