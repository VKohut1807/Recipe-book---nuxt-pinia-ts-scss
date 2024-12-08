import db from "@/db";

import type { UserType, ExtendedUserType } from "@/types/user-types";

export const registerUserMutation = async ({
  username,
  email,
  password,
}: UserType): Promise<ExtendedUserType> => {
  const statement = db.prepare(`
    INSERT INTO users (email, username, password)
    VALUES (?, ?, ?)
  `);

  const result = statement.run(email, username, password);

  return {
    id: Number(result.lastInsertRowid),
    email,
    username,
  };
};
