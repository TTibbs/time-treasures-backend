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
              expect(task).toHaveProperty("is_default")
            });
          });
    });
    test("GET: 200 /users/:user_id/tasks - returns array of only default tasks when user has no custom tasks or is not signed in", () => {
      return request(app)
        .get(`/api/users/800/tasks`) 
        .expect(200)
        .then(({ body: { tasks } }) => {
          expect(tasks).toHaveLength(3)
          tasks.forEach((task) => {
            expect(task).toHaveProperty("user_id", null); //confusion - null vs 0? 
            expect(task).toHaveProperty("task_name", expect.any(String));
            expect(task).toHaveProperty("gem_value", expect.any(Number));
            expect(task).toHaveProperty("is_default", true)
          })
        });
    })
    test("GET: 400 /users/:user_id/tasks - should return an error when passed an invalid user_id", () => {
        return request(app)
          .get("/api/users/banana/tasks")
          .expect(400)
          .then(({body: {msg}}) => {
            expect(msg).toBe("Bad request")
          })
    })  
    test("GET: 200 /users/:user_id/routines - returns an array of routine objects ", () =>{
          return request(app)
          .get(`/api/users/1/routines`)
          .expect(200)
          .then(({body: { routines }}) => {
            expect(Array.isArray(routines)).toBe(true)
            expect(routines).toHaveLength(2)
            routines.forEach(routine => {
              expect(routine).toHaveProperty("routine_id", expect.any(Number))
              expect(routine).toHaveProperty("user_id", expect.any(Number))
              expect(routine).toHaveProperty("task_1", expect.any(Number))
              expect(routine).toHaveProperty("task_2", expect.any(Number))
              expect(routine).toHaveProperty("task_3", expect.any(Number))
              const expectedProperties = ["task_4","task_5", "task_6", "task_7", "task_8", "task_9", "task_10", "task_11", "task_12", "task_13", "task_14", "task_15",]
              expectedProperties.forEach((property) => {
                expect(routine).toHaveProperty(property)
              })
              expect(routine).toHaveProperty("target_time", expect.any(Number))
            })
          })
    })
    test("GET 404: /users/:user_id/routines - returns an error when given a valid but non-existent user_id", () => {
          return request(app)
          .get(`/api/users/999/routines`)
          .expect(404)
          .then(({body: { msg }}) => {
            expect(msg).toBe("Error retrieving routines")
          })
    });
    test("GET 400: /users/:user_id/routines - returns an error when passsed an invalid user_id", () => {
          return request(app)
          .get(`/api/users/kewi/routines`)
          .expect(400)
          .then(({body: { msg }}) => {
            expect(msg).toBe("Bad request")
          })
    });
    test("POST: 201 /users/:user_id/tasks - inserts a new tasks and sends it back to the user as a body", ()=>{
      const newTask = {task_name: "tickle yourself", gem_value: 2}
      const expectedTask = {user_id: 1, task_name: "tickle yourself", gem_value: 2, is_default: false }
      return request(app)
      .post(`/api/users/1/tasks`)
      .send(newTask)
      .expect(201)
      .then(( {body: {task} })=>{
        expect(task).toMatchObject(expectedTask)
      })
    })
    //404 valid buyt not present user 
    //400 invalid user
    //400 missing task name or gem value  
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

    test("GET: 200 /tasks/:task_id - returns an array containing a single task object", () =>{
      return request(app)
      .get(`/api/tasks/1`)
      .expect(200)
      .then(({body: {task}}) => {
        expect(Array.isArray(task)).toBe(false)
        expect(typeof task).toBe("object")
        expect(task.task_name).toBe("Brush Teeth")
        expect(task.gem_value).toBe(1)
        expect(task.is_default).toBe(false)
        expect(task.user_id).toBe(1)
      })
    })

    test("GET: 400 /tasks/:task_id - returns an error message when passed and invalid datatype for :task_id", () =>{
      return request(app)
      .get(`/api/tasks/watermelon`)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Bad request")
      })
    })
    test("GET: 404 /tasks/:task_id - returns an error message when passed a valid but non-existant task_id", () =>{
      return request(app)
      .get(`/api/tasks/9999`)
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Task not Found")
      })
    })
  })

  describe("Testing the routine endpoint", () => {
    test("GET 200: /routines/:routine_id returns a single routine object", () => {
      return request(app)
      .get(`/api/routines/1`)
      .expect(200)
      .then(({body: { routine }}) => {
        expect(typeof routine).toBe("object")
        expect(routine.user_id).toBe(1)
        expect(routine.task_1).toBe(1)
        expect(routine.task_2).toBe(2)
        expect(routine.task_3).toBe(3)
        expect(routine.target_time).toBe(300000)
      })
    })
    test("GET 404: /routines/:routine_id returns an error for a non-existent but valid routine_id", () => {
      return request(app)
      .get(`/api/routines/67`)
      .expect(404)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Routine not found")
      })
    })
    test("GET 400: /routines/:routine_id returns an error for a routine_id with an invalid data type", () => {
      return request(app)
      .get(`/api/routines/banana`)
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Bad request")
      })
    })
  }); 
})
    



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
