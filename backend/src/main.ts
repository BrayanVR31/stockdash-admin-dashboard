import "module-alias/register";
import "dotenv/config";
import { database } from "@config";
import { startServer } from "./app";

async function main() {
  try {
    await database.initDBConnection();
  } catch (error) {
    console.log(error);
  } finally {
    startServer();
  }
}

main();
