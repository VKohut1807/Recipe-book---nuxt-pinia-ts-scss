import betterSqlite3 from "better-sqlite3";
import path from "path";
import fs from "fs";

import { migrate as RUN__MIGRATE_SEED } from "@/db/migrate";

const __dirname = process.cwd();
const dbPath = path.resolve(__dirname, "./db/recipe-book.sqlite");
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = betterSqlite3(dbPath);

// RUN__MIGRATE_SEED();

export default db;
