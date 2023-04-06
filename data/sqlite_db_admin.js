const sqlite = require("sqlite3");
const createUserTable = require("../models/sqlite_admin");

const filePath = "./data/admin.db"; 


    const db = new sqlite.Database(filePath, (error) => {
        if (error) {
            return console.error(+error)
        }
    })

    createUserTable(db);
    
    console.log("Admin database connected successfully");

module.exports = db;