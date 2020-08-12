const Database = require('sqlite-async')
Database.open(__dirname + '/database.sqlite').then(execute)

function execute(db){
    //Criar tabelas no banco de dados
    //Recebe db, executa e retorna db.
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute) 
//Envia e recebe de volta, no then, o db. 