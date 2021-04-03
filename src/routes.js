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

//request response
routes.get('/', (req, res) => res.render(views + "index", { profileName: profile.name, profileAvatar: profile.avatar}))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    console.log(req)
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile }))


module.exports = routes;