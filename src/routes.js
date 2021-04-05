const express = require("express")
const routes = express.Router()
const views = __dirname + "/views/"

const Profile = {
    data: {
        name: "Mateus",
        avatar: "https://github.com/mateusferrodasilva.png",
        "monthly-budget": 3000,
        "hours-per-day": 5,
        "days-per-week": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },

    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },

        update(req, res) {
            // req.body para pegar os dados
            const data = req.body

            // definir quantas semanas tem num ano : 52
            const weeksPerYear = 52

            // remover as semanas de férias no ano, para pegar quantas semanas tem em 1 mês
            const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

            // quantas horas por semana estou trabalhando
            const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

            // total de horas trabalhadas no mes
            const monthlyTotalHours = weeksPerMonth * weekTotalHours

            // valor da hora
            const valueHour = data["monthly-budget"] / monthlyTotalHours

            Profile.data = {
                ...Profile.data,
                ...req.body,
                "value-hour": valueHour
            }

            return res.redirect('/profile')
        }
    }
}

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
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"])
                }
            })

            return res.render(views + "index", { profileName: Profile.data.name, profileAvatar: Profile.data.avatar, jobs: updatedJobs })
        },
        create(req, res) {
            return res.render(views + "job")
        },
        save(req, res) {
            // req.body = { name: 'asdf', 'daily-hours': '3.1', 'total-hours': '3'}
            const lastID = Job.data[Job.data.length - 1]?.id || 1;

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

            if(!job) {
                return res.send('Job not found!')
            }

            job.budget = Job.services.calculateBudget(job, Profile.data["value-hour"])
            
            return res.render(views + "job-edit", { job })
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
        calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
    }
}

//request response
routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)


module.exports = routes;