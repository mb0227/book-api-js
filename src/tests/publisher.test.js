const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Import the server
const Publisher = require("../models/Publisher");

let mongoServer;
let server;

// 🛠 Setup & Teardown for Test Database
beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connection.close();
    await mongoose.connect(uri, { });
    server = app.listen(process.env.TEST_PORT); // Start the server on a test port
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close()
});

beforeEach(async () => {
    await Publisher.deleteMany({});
});

describe("Publishers API", () => {
    it("should fetch all Publishers (empty at first)", async () => {
        const res = await request(app).get("/api/publishers");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });

    it("should add a new Publisher", async () => {
        const PublisherData = {
            "name": "Penguin Random House",
            "founded": 1927, 
            "headquarters": "New York, USA", 
            "website": "https://www.penguinrandomhouse.com" 
        };

        const res = await request(app).post("/api/publishers").send(PublisherData);
        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(PublisherData.name);
    });

    it("should fail when trying to add a Publisher with missing fields", async () => {
        const res = await request(app).post("/api/publishers").send({
            "headquarters": "New York, USA", 
            "website": "https://www.penguinrandomhouse.com", 
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("required");
    });
});
