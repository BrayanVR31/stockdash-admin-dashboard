import express from "express";
const app = express();

app.get("*", function (request, response) {
  response.json({ message: "Express server is ready and you can get started" });
});

app.listen(4000, function () {
  console.log("Server is ready at: http://localhost:4000");
});
