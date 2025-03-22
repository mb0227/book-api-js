const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); 
const Book = require("../models/Book");
const Author = require("../models/Author");
const Genre = require("../models/Genre");
const Publisher = require("../models/Publisher");

let mongoServer;
let server;  // Define server variable

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); 
    await mongoose.connect(uri, {});
    server = app.listen(process.env.TEST_PORT);
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    if (server) {
        server.close(); 
    }
});


beforeEach(async () => {
    await Book.deleteMany({});
});

describe("Books API", () => {
    it("should fetch all Books (empty at first)", async () => {
        const res = await request(app).get("/api/books");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]); 
    });

    it("should fail when trying to add a Book without required fields", async () => {
        const res = await request(app).post("/api/books").send({
            publisher: "Bloomsbury",
            pages: 309
            ,"isbn": "9780747532699"
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toContain("Book validation failed");
    });
});
