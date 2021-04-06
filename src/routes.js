const express = require("express")
const routes = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')

// Object Literal
const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria Guloso",
            'daily-hours': 2,
            'total-hours': 1,
            'created-at': Date.now(),
        },
        {
            id: 2,
            name: "OneTwo Project",
            'daily-hours': 3,
            'total-hours': 47,
            'created-at': Date.now(),
        }
    ],

    controllers: {
        index(req, res) {
            const updatedJobs = Job.data.map((job) => {
                // ajustes no job
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job)
                }
            })
    
            return res.render("index", { profileName: Profile.data.name, profileAvatar: Profile.data.avatar, jobs: updatedJobs })
        },
        create(req, res) {
            return res.render("job")
        },
        save(req, res) {
            // req.body = { name: 'asdf', 'daily-hours': '3.1', 'total-hours': '3'}
            const lastID = Job.data[Job.data.length - 1]?.id || 0;
    
            Job.data.push({
                id: lastID + 1,
                name: req.body.name,
                'daily-hours': req.body["daily-hours"],
                'total-hours': req.body["total-hours"],
                'created-at': Date.now() // atribuindo data de hoje
            })
    
            return res.redirect('/')
        },
        show(req, res) {
            // pegando parametro do get :id
            const jobId = req.params.id
    
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
            if (!job) {
                return res.send('Job not found!')
            }
    
            job.budget = Job.services.calculateBudget(job)
    
            return res.render("job-edit", { job })
        },
        update(req, res) {
            const jobId = req.params.id
    
            const job = Job.data.find(job => Number(job.id) === Number(jobId))
    
            if (!job) {
                return res.send('Job not found!')
            }
    
            const updatedJob = {
                ...job,
                name: req.body.name,
                "total-hours": req.body["total-hours"],
                "daily-hours": req.body["daily-hours"]
            }
    
            Job.data = Job.data.map(job => {
                if (Number(job.id) === Number(jobId)) {
                    job = updatedJob
                }
                return job
            })
            res.redirect('/job/' + jobId)
        },
        delete(req, res) {
            const jobId = req.params.id
    
            // retornar verdadeiro não altera, retorna false remove da array
            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
            return res.redirect('/')
        }
    },
    
    services: {
        remainingDays(job) {
            // cálculo de tempo restante
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

            const createdDate = new Date(job["created-at"])
            const dueDay = new Date(createdDate.getDate() + Number(remainingDays))
            const dueDateInMs = createdDate.setDate(dueDay)

            const timeDiffInMs = dueDateInMs - Date.now()

            // transformar ms em dias
            const dayInMs = 1000 * 60 * 60 * 24
            const dayDiff = Math.floor((timeDiffInMs / dayInMs))

            return dayDiff
        },
        calculateBudget: (job) => Profile.data["value-hour"] * job["total-hours"]
    }
}

routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

module.exports = routes;