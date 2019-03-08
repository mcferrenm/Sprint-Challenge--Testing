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

  describe("POST /", () => {
    it("should validate required fields inside the req body, and return 422 for incomplete information", async () => {
      const valid = {
        title: "Pacman", // required
        genre: "Arcade" // required
      };

      const invalid = {};

      const res = await request(server).post("/games").send(invalid);
      expect(res.status).toBe(422);

      const validRes = await request(server).post("/games").send(valid);
      expect(validRes.status).toBe(201);
    });
  });
});
