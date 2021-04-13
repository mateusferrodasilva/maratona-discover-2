module.exports = {
    remainingDays(job) {
        // cálculo de tempo restante
        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        const createdDate = new Date(job["created-at"])
        const dueDay = new Date(createdDate.getDate() + Number(remainingDays))
        const dueDateInMs = createdDate.setDate(dueDay)

        const timeDiffInMs = dueDateInMs - Date.now()

        // transformar ms em dias
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.ceil((timeDiffInMs / dayInMs))

        return dayDiff
    },
    calculateBudget: (job, value_hour) => value_hour * job["total-hours"]
}