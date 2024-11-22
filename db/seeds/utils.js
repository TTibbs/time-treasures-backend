exports.formatRoutineTasks = (obj) => {
    const {routineName, userId, tasks, targetTime} = obj
    if (!tasks) return []
    const endIndex = tasks.length
    if (tasks.length < 15) {
        tasks.length = 15
        tasks.fill(null, endIndex, 15)
    }
    const formattedData = [routineName]
    formattedData.push(userId)
    tasks.forEach(task => formattedData.push(task))
    formattedData.push(targetTime)
    return formattedData
}
