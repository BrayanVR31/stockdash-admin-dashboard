import "module-alias/register";
import "dotenv/config";
import { database } from "@/config";
import { User } from "@/models";
import { startServer } from "./app";

async function main() {
  try {
    await database.initDBConnection();

    // Create an user when the database it's clean
    const user = await User.findOne({ email: "admin@gmail.com" });
    if (!user) {
      const createdUser = new User();
      createdUser.email = "admin@gmail.com";
      createdUser.password = "reactquery";
      await createdUser.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    startServer();
  }
}
main();
