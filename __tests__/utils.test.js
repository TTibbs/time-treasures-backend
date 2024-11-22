const { formatRoutineTasks } = require("../db/seeds/utils.js");

describe("formatRoutineTasks", () => {
  test("returns an array", () => {
    expect(formatRoutineTasks([])).toEqual([]);
  });
  test("returns a flat array", () => {
    const testData = {
      routineName: "Morning routine",
      userId: 1,
      tasks: [1, 2, 3],
      targetTime: 300000,
    };
    expect(formatRoutineTasks(testData)).toEqual([
      "Morning routine",
      1,
      1,
      2,
      3,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      300000,
    ]);
  });
  test("returns formatted array", () => {
    const testData = {
      routineName: "Chocolate routine",
      userId: 1,
      tasks: [1, 2, 3, 4, 5],
      targetTime: 300000,
    };
    expect(formatRoutineTasks(testData)).toEqual([
      "Chocolate routine",
      1,
      1,
      2,
      3,
      4,
      5,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      300000,
    ]);
  });
  test("returns formatted array when there are 15 tasks", () => {
    const testData = {
      routineName: "Banana routine",
      userId: 1,
      tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6],
      targetTime: 300000,
    };
    expect(formatRoutineTasks(testData)).toEqual([
      "Banana routine",
      1,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      1,
      2,
      3,
      4,
      5,
      6,
      300000,
    ]);
  });
});
