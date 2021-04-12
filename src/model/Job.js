const Database = require('../db/config')

module.exports = {
    async get() {
        const db = await Database()

        const jobs = await db.all(`SELECT * FROM jobs`)

        await db.close()

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            "created-at": job.created_at
        }));
    },
    update(newJobData) {
        data = newJobData
    },
    delete(jobId) {
        data = data.filter(job => Number(job.id) !== Number(jobId))
    },
    create(newJob) {
        data.push(newJob)
    }
}
