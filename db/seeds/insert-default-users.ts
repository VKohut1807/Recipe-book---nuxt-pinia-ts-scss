import db from "@/db";

export const seedUsers = () => {
  const insertUsersQuery = `
    INSERT OR IGNORE INTO users (email, username, password)
    VALUES
      ('admin@example.com', 'admin', 'pass'),
      ('user@example.com', 'user', 'pass');
  `;
  db.prepare(insertUsersQuery).run();
};
