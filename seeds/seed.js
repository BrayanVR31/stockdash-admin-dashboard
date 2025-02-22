db = db.getSiblingDB("stockdash");

db.users.aggregate([
  {
    $lookup: {
      from: "roles",
      localField: "rol",
      foreignField: "name",
      as: "userRol",
    },
  },
  {
    $set: {
      rol: { $arrayElemAt: ["$userRol._id", 0] },
    },
  },
  {
    $set: {
      createdAt: new Date(),
    },
  },
  {
    $set: {
      updatedAt: new Date(),
    },
  },
  {
    $set: {
      deletedAt: null,
    },
  },
  {
    $project: {
      userRol: 0,
    },
  },
  {
    $merge: {
      into: "users",
    },
  },
]);

db.users.find();
