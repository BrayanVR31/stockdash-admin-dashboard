db.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "readWrite", db: "stockdash" }],
});

db = db.getSiblingDB("stockdash");
db.createCollection("roles");
db.createCollection("users");
