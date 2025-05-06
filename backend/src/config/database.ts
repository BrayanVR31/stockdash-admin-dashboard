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
    if (error) console.log(error);
    throw new Error("ERROR TO STABLISH DATABASE CONNECTION");
  }
}

const dbUri = `mongodb://${hostname}:${port}/${database}`;
const adminUri = `mongodb://${hostname}:${port}`;

export class Database {
  private static instance: Database;

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public static async connect(): Promise<"success" | "failed"> {
    try {
      await mongoose.connect(dbUri, { user, pass });
      return Promise.resolve("success");
    } catch (e) {
      return Promise.reject("failed");
    }
  }

  private static async adminConnect() {
    try {
      return mongoose.createConnection(adminUri, { user, pass });
    } catch (e) {}
  }

  public static async refreshDB(dbName: string) {
    try {
      const adminDb = await this.adminConnect();
      const existsDb = dbName === database;
      if (!existsDb) {
        await adminDb.close();
        return false;
      }
      await adminDb.useDb(database).dropDatabase();
      await adminDb.close();
      return true;
    } catch (e) {
      return Promise.reject(false);
    }
  }

  public static dbStatus(): "connected" | "disconnected" {
    return !this.instance ? "disconnected" : "connected";
  }

  public static async closeConnection() {
    await mongoose.disconnect();
    this.instance = null;
  }
}
