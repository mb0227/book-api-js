const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Author = require("../models/Author");

let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect();
    await mongoose.connect(uri, {});
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

describe("Authors API", () => {
    it("should fetch all Authors (empty at first)", async () => {
        const res = await request(app).get("/api/authors");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("should fail to add an Author without required fields", async () => {
        const res = await request(app).post("/api/authors").send({});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Author validation failed");
    });

    it("should not add a duplicate Author", async () => {
        await request(app).post("/api/authors").send({
            "name": "J.K. Rowling"
            ,"birthDate": "1965-07-31"
            ,"nationality": "British"
            ,"biography": "Author of Harry Potter series"
        });

        const res = await request(app).post("/api/authors").send({
            "name": "J.K. Rowling"
            ,"birthDate": "1965-07-31"
            ,"nationality": "British"
            ,"biography": "Author of Harry Potter series"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("duplicate key error");
    });
});
