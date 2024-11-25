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
        expect(row).toHaveProperty("routine_name", expect.any(String));
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
    test("GET: 200 /users Should return an array of users", () => {
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
    test("GET: 200 /users/:user_id - returns an object for an individual user", () => {
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
    test("GET: 404 /users/:user_id - returns an error for non-existent user id", () => {
      return request(app)
        .get("/api/users/4000")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User does not exist");
        });
    });
    test("GET: 400 /users/:user_id - Should return an error for a invalid user_id", () => {
      return request(app)
        .get("/api/users/pear")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("GET: 200 /users/:user_id/tasks - Should return an array of tasks by the user id plus default tasks", () => {
      return request(app)
        .get("/api/users/1/tasks")
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(8);
          tasks.forEach((task) => {
            expect([expect.any(Number), null]).toContainEqual(task.user_id);
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
            expect(task).toHaveProperty("is_default");
          });
        });
    });
    test("GET: 200 /users/:user_id/tasks - returns array of only default tasks when user has no custom tasks or is not signed in", () => {
      return request(app)
        .get(`/api/users/800/tasks`)
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(3);
          tasks.forEach((task) => {
            expect(task).toHaveProperty("user_id", null); //confusion - null vs 0?
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
            expect(task).toHaveProperty("is_default", true);
          });
        });
    });
    test("GET: 400 /users/:user_id/tasks - should return an error when passed an invalid user_id", () => {
      return request(app)
        .get("/api/users/banana/tasks")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("GET: 200 /users/:user_id/routines - returns an array of routine objects ", () => {
      return request(app)
        .get(`/api/users/1/routines`)
        .expect(200)
        .then(({ body: { routines } }) => {
          expect(Array.isArray(routines)).toBe(true);
          expect(routines).toHaveLength(2);
          routines.forEach((routine) => {
            expect(routine).toHaveProperty("routine_id", expect.any(Number));
            expect(routine).toHaveProperty("routine_name", expect.any(String));
            expect(routine).toHaveProperty("user_id", expect.any(Number));
            expect(routine).toHaveProperty("task_1", expect.any(Number));
            expect(routine).toHaveProperty("task_2", expect.any(Number));
            expect(routine).toHaveProperty("task_3", expect.any(Number));
            const expectedProperties = [
              "task_4",
              "task_5",
              "task_6",
              "task_7",
              "task_8",
              "task_9",
              "task_10",
              "task_11",
              "task_12",
              "task_13",
              "task_14",
              "task_15",
            ];
            expectedProperties.forEach((property) => {
              expect(routine).toHaveProperty(property);
            });
            expect(routine).toHaveProperty("target_time", expect.any(Number));
          });
        });
    });
    test("GET 404: /users/:user_id/routines - returns an error when given a valid but non-existent user_id", () => {
      return request(app)
        .get(`/api/users/999/routines`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Error retrieving routines");
        });
    });
    test("GET 400: /users/:user_id/routines - returns an error when passsed an invalid user_id", () => {
      return request(app)
        .get(`/api/users/kewi/routines`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("POST: 201 /users/:user_id/tasks - inserts a new task and sends it back to the user as a body", () => {
      const newTask = { task_name: "tickle yourself", gem_value: 2 };
      const expectedTask = {
        user_id: 1,
        task_name: "tickle yourself",
        gem_value: 2,
        is_default: false,
      };
      return request(app)
        .post(`/api/users/1/tasks`)
        .send(newTask)
        .expect(201)
        .then(({ body: { task } }) => {
          expect(task).toMatchObject(expectedTask);
        });
    });
    test("POST: 400 /users/:user_id/tasks - returns an error when passed a valid but non-existent user", () => {
      const newTask = { task_name: "tickle yourself", gem_value: 2 };
      return request(app)
        .post(`/api/users/999/tasks`)
        .send(newTask)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("POST: 400 /users/:user_id/tasks - returns an error when passed a invalid user_id", () => {
      const newTask = { task_name: "tickle yourself", gem_value: 2 };
      return request(app)
        .post(`/api/users/kumquat/tasks`)
        .send(newTask)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("POST: 400 /users/:user_id/tasks - returns an error if the task name is missing", () => {
      const newTask = { gem_value: 2 };
      return request(app)
        .post(`/api/users/1/tasks`)
        .send(newTask)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing input");
        });
    });
    test("POST: 400 /users/:user_id/tasks - returns an error if the gem value is missing", () => {
      const newTask = { task_name: "feed cat" };
      return request(app)
        .post(`/api/users/1/tasks`)
        .send(newTask)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing input");
        });
    });
    test("POST: 201 /users/:user_id/routines - inserts a new routine and sends it back to the user as a body", () => {
      const newRoutine = {
        routine_name: "Lunchtime routine",
        tasks: [1, 20, 3],
        target_time: 300000,
      };
      const expectedRoutine = {
        routine_name: "Lunchtime routine",
        user_id: 1,
        task_1: 1,
        task_2: 20,
        task_3: 3,
        task_4: null,
        task_5: null,
        task_6: null,
        task_7: null,
        task_8: null,
        task_9: null,
        task_10: null,
        task_11: null,
        task_12: null,
        task_13: null,
        task_14: null,
        task_15: null,
        target_time: 300000,
      };
      return request(app)
        .post(`/api/users/1/routines`)
        .send(newRoutine)
        .expect(201)
        .then(({ body: { routine } }) => {
          expect(routine).toMatchObject(expectedRoutine);
        });
    });
    test("POST: 400 /users/:user_id/routines - returns an error when passed a valid but non-existent user", () => {
      const newRoutine = {
        routine_name: "Breakfast routine",
        tasks: [1, 20, 3],
        target_time: 700000,
      };
      return request(app)
        .post(`/api/users/999/routines`)
        .send(newRoutine)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("POST: 400 /users/:user_id/routines - returns an error when passed a invalid user_id type", () => {
      const newRoutine = {
        routine_name: "Breakfast routine",
        tasks: [1, 3],
        target_time: 706700,
      };
      return request(app)
        .post(`/api/users/strawberry/routines`)
        .send(newRoutine)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("POST: 400 /users/:user_id/routines - returns an error if the routine name is missing", () => {
      const newRoutine = { tasks: [1, 3], target_time: 123456 };
      return request(app)
        .post(`/api/users/1/routines`)
        .send(newRoutine)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing input");
        });
    });
    test("POST: 400 /users/:user_id/routines - returns an error if the routine name is missing", () => {
      const newRoutine = { target_time: 123456 };
      return request(app)
        .post(`/api/users/1/routines`)
        .send(newRoutine)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Missing input");
        });
    });
    test("PATCH: 200 /users/:user_id - updates the routine and returns a body to the client", () => {
      const updatedUser = {
        username: "Bob",
      };
      return request(app)
        .patch(`/api/users/1`)
        .send(updatedUser)
        .expect(200)
        .then(({ body: { patchedUser } }) => {
          expect(patchedUser.username).toBe("Bob");
        });
    });
    test("PATCH: 200 /users/:user_id - updates the routine and returns correct body with gems updated", () => {
      const updatedUser = {
        total_gems: 201,
      };
      return request(app)
        .patch(`/api/users/1`)
        .send(updatedUser)
        .expect(200)
        .then(({ body: { patchedUser } }) => {
          expect(patchedUser.total_gems).toBe(201);
        });
    });
    test("POST: 201 /users/:user_id/history - adds to routine to history table by user_id ", () => {
      const completedRoutine = {
        userId: 1,
        routineId: 4,
        timestamp: "2024-11-18T08:00:00Z",
        time: 500000,
      };
      return request(app)
        .post(`/api/users/1/histories`)
        .send(completedRoutine)
        .expect(201)
        .then(({ body: { completedRoutine } }) => {
          expect(completedRoutine).toHaveProperty("user_id", 1);
          expect(completedRoutine).toHaveProperty("routine_id", 4);
          expect(completedRoutine).toHaveProperty(
            "timestamp",
            expect.any(String)
          );
          expect(completedRoutine).toHaveProperty(
            "total_time",
            expect.any(Number)
          );
        });
    });
    test("POST: 400 /users/:user_id/history - returns error message when body is missing values", () => {
      const incompleteRoutine = {
        routineId: 4,
      };
      return request(app)
        .post(`/api/users/1/histories`)
        .send(incompleteRoutine)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request: Missing required fields");
        });
    });
    test("POST: 404 /users/:user_id/history - returns error message when user_id is invalid", () => {
      const completedRoutine = {
        routineId: 4,
        timestamp: "2024-11-18T08:00:00Z",
        time: 500000,
      };
      return request(app)
        .post(`/api/users/invalid/histories`)
        .send(completedRoutine)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User not found");
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

    test("GET: 200 /tasks/:task_id - returns an array containing a single task object", () => {
      return request(app)
        .get(`/api/tasks/1`)
        .expect(200)
        .then(({ body: { task } }) => {
          expect(Array.isArray(task)).toBe(false);
          expect(typeof task).toBe("object");
          expect(task.task_name).toBe("Brush Teeth");
          expect(task.gem_value).toBe(1);
          expect(task.is_default).toBe(false);
          expect(task.user_id).toBe(1);
        });
    });

    test("GET: 400 /tasks/:task_id - returns an error message when passed and invalid datatype for :task_id", () => {
      return request(app)
        .get(`/api/tasks/watermelon`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("GET: 404 /tasks/:task_id - returns an error message when passed a valid but non-existent task_id", () => {
      return request(app)
        .get(`/api/tasks/9999`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Task not Found");
        });
    });

    test("DELETE: 204 /tasks/:task_id - returns 204 and no content when task successfully deleted", () => {
      return request(app)
        .delete(`/api/tasks/1`)
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
          return db
            .query("SELECT * FROM tasks WHERE task_id = 1;")
            .then(({ rows }) => {
              expect(rows.length).toBe(0);
            });
        });
    });
    test("DELETE: 404 /tasks/:task_id - returns 404 when task id not found", () => {
      return request(app)
        .delete(`/api/tasks/9999`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Task Not Found");
        });
    });
    test("DELETE: 400 /tasks/:task_id - returns 400 when passed an invalid task id", () => {
      return request(app)
        .delete(`/api/tasks/not-an-id`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });

  describe("Testing the routine endpoint", () => {
    test("GET 200: /routines/:routine_id returns a single routine object", () => {
      return request(app)
        .get(`/api/routines/1`)
        .expect(200)
        .then(({ body: { routine } }) => {
          expect(typeof routine).toBe("object");
          expect(routine.user_id).toBe(1);
          expect(routine.task_1).toBe(1);
          expect(routine.task_2).toBe(2);
          expect(routine.task_3).toBe(3);
          expect(routine.target_time).toBe(300000);
        });
    });
    test("GET 404: /routines/:routine_id returns an error for a non-existent but valid routine_id", () => {
      return request(app)
        .get(`/api/routines/67`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Routine not found");
        });
    });
    test("GET 400: /routines/:routine_id returns an error for a routine_id with an invalid data type", () => {
      return request(app)
        .get(`/api/routines/banana`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });

    test("PATCH: 200 /routines/:routine_id - updates routine tasks and returns 200 status code", () => {
      const newTasks = { tasks: [1, 3, 7, 9] };
      return request(app)
        .patch("/api/routines/1")
        .send(newTasks)
        .expect(200)
        .then(({ body }) => {
          const updatedRoutine = body[0];
          expect(body.length).toBe(1);
          expect(updatedRoutine.task_1).toBe(1);
          expect(updatedRoutine.task_2).toBe(3);
          expect(updatedRoutine.task_3).toBe(7);
          expect(updatedRoutine.task_4).toBe(9);
        });
    });
    test("PATCH: 200 /routines/:routine_id - updates routine_name and target_time returning a 200 status code", () => {
      const newUpdates = {
        routine_name: "Weekday Morning Tasks",
        target_time: 250000,
      };
      return request(app)
        .patch("/api/routines/1")
        .send(newUpdates)
        .expect(200)
        .then(({ body }) => {
          const updatedRoutine = body[0];
          expect(body.length).toBe(1);
          expect(updatedRoutine.routine_name).toBe("Weekday Morning Tasks");
          expect(updatedRoutine.target_time).toBe(250000);
        });
    });
    test("PATCH: 200 /routines/:routine_id - updates routine_name and target_time returning a 200 status code even with irrelevant keys", () => {
      const newUpdates = {
        routine_name: "Weekday Morning Tasks",
        target_time: 250000,
        irrelevant: "not important",
      };
      return request(app)
        .patch("/api/routines/1")
        .send(newUpdates)
        .expect(200)
        .then(({ body }) => {
          const updatedRoutine = body[0];
          expect(body.length).toBe(1);
          expect(updatedRoutine.routine_name).toBe("Weekday Morning Tasks");
          expect(updatedRoutine.target_time).toBe(250000);
        });
    });
    test("PATCH: 400 /routines/:routine_id - returns 400 Bad Request when passed an invalid id", () => {
      const newUpdates = {
        routine_name: "Weekday Morning Tasks",
        target_time: 250000,
      };
      return request(app)
        .patch("/api/routines/not-an-id")
        .send(newUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
    test("PATCH: 404 /routines/:routine_id - returns 400 Bad Request when passed a non-existent id", () => {
      const newUpdates = {
        routine_name: "Weekday Morning Tasks",
        target_time: 250000,
      };
      return request(app)
        .patch("/api/routines/9999")
        .send(newUpdates)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Routine Not Found");
        });
    });
    test("PATCH: 400 /routines/:routine_id - returns 400 Bad Request when passed a patch with no correct keys", () => {
      const newUpdates = { nothing: "not helpful", irrelevant: 250000 };
      return request(app)
        .patch("/api/routines/1")
        .send(newUpdates)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });

    test("DELETE: 204 /routines/:routine_id - returns 204 and no content when task successfully deleted", () => {
      return request(app)
        .delete(`/api/routines/1`)
        .expect(204)
        .then(({ body }) => {
          expect(body).toEqual({});
          return db
            .query("SELECT * FROM routines WHERE routine_id = 1;")
            .then(({ rows }) => {
              expect(rows.length).toBe(0);
            });
        });
    });
    test("DELETE: 404 /routines/:routine_id - returns 404 when routine id not found", () => {
      return request(app)
        .delete(`/api/routines/9999`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Routine Not Found");
        });
    });
    test("DELETE: 400 /routines/:routine_id - returns 400 when passed an invalid routine id", () => {
      return request(app)
        .delete(`/api/routines/not-an-id`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });

  describe("Testing the histories endpoint", () => {
    test("GET: 200 /histories - returns an array of histories", () => {
      return request(app)
        .get(`/api/histories`)
        .expect(200)
        .then(({ body: { histories } }) => {
          histories.forEach((history) => {
            expect(history).toHaveProperty("history_id", expect.any(Number));
            expect(history).toHaveProperty("user_id", expect.any(Number));
            expect(history).toHaveProperty("routine_id", expect.any(Number));
            expect(history).toHaveProperty("timestamp", expect.any(String));
            expect(history).toHaveProperty("total_time", expect.any(Number));
          });
        });
    });

    test("GET: 200 /histories/:user_id - returns an array of histories by user_id", () => {
      return request(app)
        .get(`/api/histories/1`)
        .expect(200)
        .then(({ body: { histories } }) => {
          expect(histories.length).toBe(3);
          histories.forEach((history) => {
            expect(history).toHaveProperty("history_id", expect.any(Number));
            expect(history).toHaveProperty("user_id", expect.any(Number));
            expect(history).toHaveProperty("routine_id", expect.any(Number));
            expect(history).toHaveProperty("timestamp", expect.any(String));
            expect(history).toHaveProperty("total_time", expect.any(Number));
          });
        });
    });

    test("GET: 400 /histories/:user_id - returns 400 Bad Request when passed an invalid ID", () => {
      return request(app)
        .get(`/api/histories/not-an-id`)
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad request");
        });
    });
  });
  test("GET: 404 /histories/:user_id - returns 404 not found when passed a non-existent ID", () => {
    return request(app)
      .get(`/api/histories/9999`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("History Not Found");
      });
  });
});
test("GET: 200 /histories/routine/:routine_id - returns an array of histories for a specific routine", () => {
  return request(app)
    .get(`/api/histories/routine/1`)
    .expect(200)
    .then(({ body: { histories } }) => {
      expect(histories.length).toBe(3);
      histories.forEach((history) => {
        expect(history.routine_id).toBe(1);
        expect(history).toHaveProperty("history_id", expect.any(Number));
        expect(history).toHaveProperty("user_id", expect.any(Number));
        expect(history).toHaveProperty("timestamp", expect.any(String));
        expect(history).toHaveProperty("total_time", expect.any(Number));
        expect(new Date(history.timestamp).toISOString()).toBe(
          history.timestamp
        );
      });
    });
});
test("GET: 400 /histories/routine/:routine_id - returns 400 Bad Request when passed an invalid routine ID", () => {
  return request(app)
    .get(`/api/histories/routine/not-an-id`)
    .expect(400)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("Bad request");
    });
});
test("GET: 404 /histories/routine/:routine_id - returns 404 when routine ID not found", () => {
  return request(app)
    .get(`/api/histories/routine/9999`)
    .expect(404)
    .then(({ body: { msg } }) => {
      expect(msg).toBe("History Not Found");
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
});
