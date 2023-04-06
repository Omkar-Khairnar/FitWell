function createUserTable(db) {

db.exec( 
    "CREATE TABLE if not exists USERS (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT,email TEXT , password TEXT,  age INTEGER, gender TEXT, weight INTEGER,height INTEGER, image TEXT)"
    );

}

module.exports = createUserTable;