const express = require("express")
const routes = express.Router()

const views = __dirname + "/views/"

const profile = {
    name: "Mateus",
    avatar: "https://github.com/mateusferrodasilva.png",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4
}

const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        'daily-hours': 2,
        'total-hours' : 60,
        'created-at' : Date.now()
    },
    {
        id: 2,
        name: "OneTwo Project",
        'daily-hours': 3,
        'total-hours' : 47,
        'created-at' : Date.now()
    }
]

//request response
routes.get('/', (req, res) => res.render(views + "index", { profileName: profile.name, profileAvatar: profile.avatar}, { jobs }))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    // req.body = { name: 'asdf', 'daily-hours': '3.1', 'total-hours': '3'}
    const lastID = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastID + 1,
        name: req.body.name,
        'daily-hours': req.body["daily-hours"],
        'total-hours' : req.body["total-hours"],
        'created-at' : Date.now() // atribuindo data de hoje
    })

    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes;