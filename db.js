const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./number-one.db')


db.serialize(function() {

  //Criar tabela

  db.run (`CREATE TABLE IF NOT EXISTS ideas(

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    imag TEXT,
    title TEXT,
    category TEXT,
    description TEXT,
    link TEXT


  );  
  `)
})

//inserir dados na tabela

//const query = `
//INSERT INTO ideas (
// imag ,
 //title ,
 //category ,
 //description ,
 //link 

//) VALUES (?,?,?,?,?);
//`
//const values = [
//  "https://image.flaticon.com/icons/svg/893/893913.svg",
//  " Para toda familia ",
//  "Futebol",
//  "Dois times de no minimo 6 crianças de cada lado que irão jogar e quem fizer mais gols será o vencedor ",
 // "https://www.tempojunto.com/"


//]

//db.run(query, values, function(err) {
 // if (err) return console.log (err)

  //console.log(this)})

  
   //db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err){

    //if(err)  console.log(err)  

   //console.log("DELETEI", this)
  //})


//consultar dados na tabela

//db.all( `SELECT * FROM ideas`, function(err, rows){
 //if (err) return console.log (err)

  //console.log(rows)

//})

module.exports = db