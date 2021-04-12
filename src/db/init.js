const Database = require('./config')
// campos não podem ter traços ou espaços 
// trocado - por _
const initDb = {
    async init(){

        const db = await Database()

        await db.exec(`CREATE TABLE profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            avatar TEXT,
            monthly_budget INTEGER,
            hours_per_day INTEGER, 
            days_per_week INTEGER, 
            vacation_per_year INTEGER,
            value_hour INTEGER
        )`)

        await db.exec(`CREATE TABLE jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT, 
            daily_hours INTEGER,
            total_hours INTEGER, 
            created_at DATETIME
        )`)

        await db.run(`INSERT INTO profile (
            name,
            avatar, 
            monthly_budget, 
            hours_per_day,
            days_per_week, 
            vacation_per_year,
            value_hour
            ) VALUES (
            "Mateus",
            "https://github.com/mateusferrodasilva.png",
            2000,
            6,
            4,
            2,
            20
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours, 
            total_hours,
            created_at
            ) VALUES (
            "Pizzaria Guloso",
            2,
            1,
            1617514376018
        );`)

        await db.run(`INSERT INTO jobs (
            name,
            daily_hours, 
            total_hours,
            created_at
            ) VALUES (
            "OneTwo Project",
            3,
            47,
            1617514376018
        );`)

        await db.close()
    }
}

initDb.init()




