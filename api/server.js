const express = require("express");

const server = express();

const games = [];

server.use(express.json());

server.get("/games", (req, res) => {
  res.status(200).json(games);
});

server.post("/games", (req, res) => {
  if (!req.body.title || !req.body.genre) {
    res.status(422).json({ error: "Must contain title and genre" });
  } else {
    for (let i = 0; i < games.length; i++) {
      if (games[i].title === req.body.title) {
        return res.status(405).json({ error: "Duplicate title" });
      }
    }
    games.push(req.body);
    res.status(201).json(games);
  }
});

module.exports = server;
