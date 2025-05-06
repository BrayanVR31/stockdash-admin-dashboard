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
  private static dbInstance: typeof mongoose | null;
  private static adminInstance: mongoose.Connection;
  public static async connect() {
    if (!this.adminInstance) {
      this.adminInstance = mongoose.createConnection(adminUri, { user, pass });
    }
    if (!this.dbInstance) {
      this.dbInstance = await mongoose.connect(dbUri, { user, pass });
    }
  }

  public static async refreshDB() {
    const { databases = [] } = await this.adminInstance.listDatabases();
    const existsDB = databases.some((db) => db.name === "stockdash");
    if (existsDB) {
      await this.adminInstance.useDb("stockdash").db.dropDatabase();
      this.dbInstance = null;
    }
    await this.connect();
  }

  public static async closeConnection() {
    await this.dbInstance.connection.close(true);
    await this.adminInstance.close(true);
  }
}
