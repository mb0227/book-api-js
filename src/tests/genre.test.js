const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); 
const Genre = require("../models/Genre");

let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri, { });
    server = app.listen(process.env.TEST_PORT);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

beforeEach(async () => {
    await Genre.deleteMany({});
});

describe("Genres API", () => {
    it("should fetch all genres (empty at first)", async () => {
        const res = await request(app).get("/api/genres");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]); 
    });

    it("should add a new genre", async () => {
        const res = await request(app).post("/api/genres").send({ name: "Fantasy", description: "Books with magical elements"});
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe("Fantasy");
    });

    it("should fail when trying to add a duplicate genre", async () => {
        await request(app).post("/api/genres").send({ name: "Horror", description: "Scary and supernatural elements"});
        const res = await request(app).post("/api/genres").send({ name: "Horror" });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Genre already exists");
    });
});
