const Job = require('../model/Job')
const JobUtils = require('../utils/jobUtils')

module.exports = {
    index(req, res) {
        const jobs = Job.get()
        const updatedJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job)
            }
        })

        // return res.render("index", { profileName: Profile.data.name, profileAvatar: Profile.data.avatar, jobs: updatedJobs })
        return res.render("index", { jobs: updatedJobs })
    },
    create(req, res) {
        return res.render("job")
    },
    save(req, res) {
        const jobs = Job.get()
        // req.body = { name: 'asdf', 'daily-hours': '3.1', 'total-hours': '3'}
        const lastID = jobs[jobs.length - 1]?.id || 0;

        jobs.push({
            id: lastID + 1,
            name: req.body.name,
            'daily-hours': req.body["daily-hours"],
            'total-hours': req.body["total-hours"],
            'created-at': Date.now() // atribuindo data de hoje
        })

        return res.redirect('/')
    },
    show(req, res) {
        const jobs = Job.get()
        // pegando parametro do get :id
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        job.budget = JobUtils.calculateBudget(job)

        return res.render("job-edit", { job })
    },
    update(req, res) {
        const jobs = Job.get()
        const jobId = req.params.id

        const job = jobs.find(job => Number(job.id) === Number(jobId))

        if (!job) {
            return res.send('Job not found!')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"]
        }

        const newJobs = jobs.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })

        Job.update(newJobs)

        res.redirect('/job/' + jobId)
    },
    delete(req, res) {
        const jobId = req.params.id

        Job.delete(jobId)
        
        return res.redirect('/')
    }
}