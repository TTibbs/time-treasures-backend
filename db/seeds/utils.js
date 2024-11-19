exports.formatRoutineTasks = (obj) => {
    const {userId, tasks, targetTime} = obj
    if (!tasks) return []
    const endIndex = tasks.length
    if (tasks.length < 15) {
        tasks.length = 15
        tasks.fill(null, endIndex, 15)
    }
    tasks.unshift(userId)
    tasks.push(targetTime)
    return tasks
}
