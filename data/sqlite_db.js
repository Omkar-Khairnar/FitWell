const sqlite = require("sqlite3");
const createUserTable = require("../models/sqlite_users");

const filePath = "./file1.db";

function createDbConnection() {
    const db = new sqlite.Database(filePath, (error) => {
        if (error) {
            return console.error(error)
        }
    })
    
    createUserTable(db);
    
    console.log("database connected successfully");
    return db;
}

// const db = createDbConnection();

module.exports = createDbConnection;
