import db from "@/db";

export const registerUserMutation = async (
  email: string,
  username: string,
  password: string
) => {
  const statement = db.prepare(`
    INSERT INTO users (email, username, password)
    VALUES (?, ?, ?)
  `);

  const result = statement.run(email, username, password);

  return {
    id: result.lastInsertRowid,
    email,
    username,
  };
};
