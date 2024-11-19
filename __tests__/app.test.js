const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data/index.js");
const app = require("../src/app.js");
const request = require("supertest");
const db = require("../db/connection.js");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("Test of Seeds", () => {
  test("should seed users table", () => {
    return db.query("SELECT * FROM users;").then(({ rows }) => {
      rows.forEach((row) => {
        expect(row).toHaveProperty("user_id", expect.any(Number));
        expect(row).toHaveProperty("username", expect.any(String));
        expect(row).toHaveProperty("level", expect.any(Number));
        expect(row).toHaveProperty("email", expect.any(String));
        expect(row).toHaveProperty("total_gems", expect.any(Number));
        expect(row).toHaveProperty("image_url");
      });
    });
  });
  test("should seed tasks table", () => {
    return db.query("SELECT * FROM tasks;").then(({ rows }) => {
      rows.forEach((row) => {
        expect(row).toHaveProperty("task_id", expect.any(Number));
        expect(row).toHaveProperty("user_id");
        expect(row).toHaveProperty("task_name", expect.any(String));
        expect(row).toHaveProperty("gem_value", expect.any(Number));
      });
    });
  });
  test("should seed routines table", () => {
    return db.query("SELECT * FROM routines;").then(({ rows }) => {
      rows.forEach((row) => {
        expect(row).toHaveProperty("routine_id", expect.any(Number));
        expect(row).toHaveProperty("user_id", expect.any(Number));
        expect(row).toHaveProperty("task_1");
        expect(row).toHaveProperty("task_2");
        expect(row).toHaveProperty("task_3");
        expect(row).toHaveProperty("task_4");
        expect(row).toHaveProperty("task_5");
        expect(row).toHaveProperty("task_6");
        expect(row).toHaveProperty("task_7");
        expect(row).toHaveProperty("task_8");
        expect(row).toHaveProperty("task_9");
        expect(row).toHaveProperty("task_10");
        expect(row).toHaveProperty("task_11");
        expect(row).toHaveProperty("task_12");
        expect(row).toHaveProperty("task_13");
        expect(row).toHaveProperty("task_14");
        expect(row).toHaveProperty("task_15");
        expect(row).toHaveProperty("target_time", expect.any(Number));
      });
    });
  });
  test("should seed histories table", () => {
    return db.query("SELECT * FROM histories;").then(({ rows }) => {
      rows.forEach((row) => {
        expect(row).toHaveProperty("history_id", expect.any(Number));
        expect(row).toHaveProperty("user_id", expect.any(Number));
        expect(row).toHaveProperty("routine_id", expect.any(Number));
        expect(row).toHaveProperty("timestamp", expect.any(Date));
        expect(row).toHaveProperty("total_time", expect.any(Number));
      });
    });
  });
});

describe("Testing the API", () => {
  describe("Testing the users endpoint", () => {
    test("Should return an array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body: { users } }) => {
          expect(users).toHaveLength(5);
          users.forEach((user) => {
            expect(user).toHaveProperty("user_id", expect.any(Number));
            expect(user).toHaveProperty("username", expect.any(String));
            expect(user).toHaveProperty("level", expect.any(Number));
            expect(user).toHaveProperty("email", expect.any(String));
            expect(user).toHaveProperty("total_gems", expect.any(Number));
            expect(user).toHaveProperty("image_url");
          });
        });
    });
    test("Should return an object for an individual user", () => {
      const user_id = 1;
      const testUser = {
        user_id: 1,
        username: "user1",
        email: "user1@example.com",
        level: 4,
        total_gems: 120,
        image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
      };
      return request(app)
        .get(`/api/users/${user_id}`)
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toEqual(testUser);
        });
    });
  });
  describe("Testing the tasks endpoint", () => {
    test("GET: /tasks - Should return an array of tasks", () => {
      return request(app)
        .get("/api/tasks")
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(30);
          tasks.forEach((task) => {
            expect([expect.any(Number), null]).toContainEqual(task.user_id);
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
          });
        });
    });
    test("GET: /tasks/:user_id - Should return an array of tasks by the user id plus default tasks", () => {
      return request(app)
        .get("/api/tasks/1")
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(8);
          tasks.forEach((task) => {
            expect([expect.any(Number), null]).toContainEqual(task.user_id);
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
            expect(task).toHaveProperty("is_default")
          });
        });
    });
    test("GET: /tasks/:user_id - returns array of only default tasks when user_id is null (ie: no user signed in)", () => {
      return request(app)
        .get("/api/tasks/0")
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(3)
          tasks.forEach((task) => {
            expect(task).toHaveProperty("user_id", null);
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
            expect(task).toHaveProperty("is_default", true)
          })
        });
    })
  });
});

describe("Testing the endpoint errors", () => {
  test("Should return an error when the endpoint is invalid", () => {
    return request(app)
      .get("/api/notanendpoint")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid input");
      });
  });
  test("Should return an error for non-existent user id", () => {
    return request(app)
      .get("/api/users/4000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("User does not exist");
      });
  });
});
