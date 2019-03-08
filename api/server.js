const server = require("express")();

server.get("/games", (req, res) => {
  res.status(200).send("Hi");
});

module.exports = server;
