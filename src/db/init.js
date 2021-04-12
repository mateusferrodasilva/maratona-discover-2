const Database = require('config')
// campos não podem ter traços ou espaços 
// trocado - por _

Database()

Database.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    avatar TEXT,
    monthly_budget INTEGER,
    hours_per_day INTEGER, 
    days_per_week INTEGER, 
    vacation_per_year INTEGER,
    value_hour INTEGER
)`)

Database.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, 
    daily_hours INTEGER,
    total_hours INTEGER, 
    created_at DATETIME
)`)

Database.run(`INSERT INTO profile (
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
);`)

Database.run(`INSERT INTO jobs (
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

Database.run(`INSERT INTO jobs (
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

Database.close()




