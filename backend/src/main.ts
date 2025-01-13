import "module-alias/register";
import "dotenv/config";
import bcryptjs from "bcryptjs";
import { database } from "@/config";
import { startServer } from "./app";

async function main() {
  try {
    console.log(await bcryptjs.hash("reactquery", 10));
    await database.initDBConnection();
  } catch (error) {
    console.log(error);
  } finally {
    startServer();
  }
}
main();
