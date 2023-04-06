function createUserTable(db) {
    // db.exec(`
    //     DROP TABLE if exists ADMIN;
    // `);
    db.serialize(()=>{ 
        db.exec(
            "CREATE TABLE if not exists ADMIN (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT,email TEXT , password TEXT)"
            );
            // let name="admin";
            // let email='admin123@gmail.com';
            // let password='admin';
            // db.run(`INSERT INTO ADMIN(name,email,password) VALUES(?, ?, ?)`,[name,email, password], (err)=>{
            //     if(err){
            //         console.log(err);
            //         // res.status(400).send("Some Error occurred");
            //     }
            //     //  res.redirect('/signin')
            // });
    })


}

module.exports = createUserTable;