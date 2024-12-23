import mongoose from "mongoose";
const {
  DB_HOST: hostname,
  DB_PORT: port,
  DB_USER: user,
  DB_PASS: pass,
  DB_NAME: database,
} = process.env;

// Initialize db connection in all model definitions
export async function initDBConnection() {
  try {
    const url = `mongodb://${hostname}:${port}/${database}`;
    const connection = await mongoose.connect(url, { user, pass });
    console.log("CONNECTION TO DATABASE WAS SUCCESSFULLY STABLISHED");
    return connection;
  } catch (error) {
    console.log(error);
  }
}
