function createUserTable(db) {
    db.exec(`
        DROP TABLE if exists user;
    `)

    db.exec(`
        CREATE TABLE if not exists user (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT,
            AGE INTEGER,
            GENDER TEXT
        )
    `)
}

module.exports = createUserTable;