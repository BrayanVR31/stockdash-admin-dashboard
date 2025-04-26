import "module-alias/register";
import "./moduleAlias";
import "dotenv/config";
import { database } from "@/config";
import { startServer } from "./app";

async function main() {
  try {
    await database.initDBConnection();
  } catch (error) {
    console.log((error as Error).message);
  } finally {
    startServer();
  }
}
main();
