const dbName = process.env.MONGO_INITDB_DATABASE || "stockdash";
const username = process.env.MONGO_INITDB_USERNAME || "root";
const password = process.env.MONGO_INITDB_PASSWORD || "root";

db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: "readWrite", db: dbName }],
});

db = db.getSiblingDB(dbName);
db.createCollection("roles");
db.createCollection("users");
