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
    async delete(jobId) {
        const db = await Database()

        await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)

        await db.close()
    },
    async create(newJob) {
        const db = await Database()

        await db.run(`INSERT INTO jobs (
            name, 
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob["created-at"]}
        )`)
        await db.close()
    }
}
