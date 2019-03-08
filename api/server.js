const server = require("express")();

const games = [];

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

module.exports = server;
