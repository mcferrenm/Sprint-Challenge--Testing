const request = require("supertest");
const server = require("./server.js");

describe("/games", () => {
  describe("GET /", () => {
    it("should return status code 200", async () => {
      const res = await request(server).get("/games");

      expect(res.status).toBe(200);
    });

    it("should always return an array", async () => {
      const res = await request(server).get("/games");

      expect(res.body).toBeInstanceOf(Array);
    });
  });

  describe("GET /:id", async () => {
    it("should return a single game", async () => {
      // create one game
      const valid = {
        title: "Afffzz", // required
        genre: "Arcade",
      };
      await request(server)
        .post("/games")
        .send(valid);

      // get game 1
      const res = await request(server).get("/games/1");

      const expected = {
        title: "Afffzz", // required
        genre: "Arcade",
        id: 1 // required
      };

      expect(res.body).toEqual(expected);
    });
    it("should return 404 when not found", async () => {
      const res = await request(server).get("/games/2");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    it("should validate required fields inside the req body, and return 422 for incomplete information", async () => {
      const valid = {
        title: "Pacman", // required
        genre: "Arcade" // required
      };

      const invalid = {};

      const res = await request(server)
        .post("/games")
        .send(invalid);
      expect(res.status).toBe(422);

      const validRes = await request(server)
        .post("/games")
        .send(valid);
      expect(validRes.status).toBe(201);
    });
    it("should validate unqiue title", async () => {
      const duplicate = {
        title: "Pacman", // required
        genre: "Arcade" // required
      };

      await request(server)
        .post("/games")
        .send(duplicate);

      const validRes = await request(server)
        .post("/games")
        .send(duplicate);
      expect(validRes.status).toBe(405);
    });
  });
  describe('DELETE /:id', () => {
    it('should remove game from server', async () => {
      // create one game
      const valid = {
        title: "Afffzz", // required
        genre: "Arcade",
      };
      await request(server)
        .post("/games")
        .send(valid);
      
      // delete request
      await request(server).delete("/games/1")

      // check if its on server
      const res = await request(server).get("/games/1");

      const expected = {
        title: "Afffzz", // required
        genre: "Arcade",
        id: 1 // required
      };

      expect(res.body).not.toEqual(expected);

    });
    it("should return 404 when not found", async () => {
      const res = await request(server).delete("/games/23123");

      expect(res.status).toBe(404);
    });
  });
});
