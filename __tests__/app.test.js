const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js")
const app = require("../src/app.js")
const request = require("supertest")
const db = require("../db/connection.js")

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Test of Seed", () => {
    test("should seed levels table", () => {
        return db.query("SELECT * FROM levels;")
        .then(({rows}) => {
            rows.forEach((row) => {
                expect(row).toHaveProperty("gems_lower", expect.any(Number))
                expect(row).toHaveProperty("gems_upper")
                expect(row).toHaveProperty("level_id", expect.any(Number))
                expect(row).toHaveProperty("name", expect.any(String))
            })
        })
    })
    test("should seed users table", () => {
        return db.query("SELECT * FROM users;")
        .then(({rows}) => {
            console.log(rows)
            rows.forEach((row) => {
                expect(row).toHaveProperty("user_id", expect.any(Number))
                expect(row).toHaveProperty("username", expect.any(String))
                expect(row).toHaveProperty("level", expect.any(Number))
                expect(row).toHaveProperty("email", expect.any(String))
                expect(row).toHaveProperty("total_gems", expect.any(Number))
            })
        })
    })
})