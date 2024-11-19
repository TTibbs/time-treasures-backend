const { formatRoutineTasks } = require("../db/seeds/utils.js")

describe("formatRoutineTasks", () => {
    test("returns an array", () => {
        expect(formatRoutineTasks([])).toEqual([])
    })
    test("returns a flat array", () => {
        const testData = { userId: 1, tasks: [1, 2, 3], targetTime: 300000 }
        expect(formatRoutineTasks(testData)).toEqual([
            1, 1,    2,    3,    null,
            null, null, null, null,
            null, null, null, null,
            null, null, null, 300000
          ])
    })
    test("returns formatted array", () => {
        const testData = { userId: 1, tasks: [1, 2, 3, 4, 5], targetTime: 300000 }
        expect(formatRoutineTasks(testData)).toEqual([
            1, 1,    2,    3,    4,
            5, null, null, null,
            null, null, null, null,
            null, null, null, 300000
          ])
    })
    test("returns formatted array when there are 15 tasks", () => {
        const testData = { userId: 1, tasks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6], targetTime: 300000 }
        expect(formatRoutineTasks(testData)).toEqual([
            1, 1, 2, 3,
            4, 5, 6, 7,
            8, 9, 1, 2,
            3, 4, 5, 6,
       300000
     ])
    })
})