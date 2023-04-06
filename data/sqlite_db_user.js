const sqlite = require("sqlite3");
const createUserTable = require("../models/sqlite_users");

const filePath = "./data/users.db"; 


    const db = new sqlite.Database(filePath, (error) => {
        if (error) {
            return console.error(+error)
        }
    })

    createUserTable(db);
    
    console.log("User database connected successfully");

module.exports = db;
