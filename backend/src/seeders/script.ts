import "dotenv/config";
import { Database } from "@/config/database";
import DocFactory from "@/factories/DocFactory";

const main = async () => {
  try {
    console.log("seeding database");
    await Database.connect();
    await Database.refreshDB("stockdash");
    await DocFactory.run();
    await Database.closeConnection();
  } catch (e) {
    console.log("error: ", e);
  }
};

main();
