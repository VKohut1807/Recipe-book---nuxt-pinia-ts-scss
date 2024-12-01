import { createUsersTable } from "@/db/migrations/create-users-table";
import { seedUsers } from "@/db/seeds/insert-default-users";

export const migrate = () => {
  console.log("Running migrations...");
  createUsersTable();

  console.log("Running seeds...");
  seedUsers();
};
