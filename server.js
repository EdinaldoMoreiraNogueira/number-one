const express = require("express");

const server = express();

server.use(express.static("public"))

//habilitar o uso do req.body
server.use(express.urlencoded({extended: true}))

const db = require("./db")

//const ideas = [

  //{
  //  img:"https://image.flaticon.com/icons/svg/2829/2829753.svg",
  //  title: "EM CASA",
   // category: "Em Familia",
   // description: "Lorem ipsum dolor sit amet consectetur adipisicing elit ",
   // url: "http://Rocketeset.com"

  //},

 // {
  //  img:"https://image.flaticon.com/icons/svg/2829/2829843.svg",
  //  title: "HORA DA FAXINA",
  //  category: "Em Familia",
  //  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit ",
   // url: "http://Rocketeset.com"

  //},
  //{
   // img:"https://image.flaticon.com/icons/svg/2829/2829843.svg",
   // title: "HORA DA FAXINA",
    //category: "Em Familia",
   // description: "Lorem ipsum dolor sit amet consectetur adipisicing elit ",
   // url: "http://Rocketeset.com"

  //},

 // {
  //  img:"https://image.flaticon.com/icons/svg/2829/2829814.svg",
  //  title: "DESCANSO",
  //  category: "Em Familia",
   // description: "Lorem ipsum dolor sit amet consectetur adipisicing elit ",
   // url: "http://Rocketeset.com"

  //},
//];

//Configurando o nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
})


server.get("/", function(req, res) { 

db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) return console.log (err)
  
    const reversedIdeas = [...rows].reverse()

  let lastIdeas = [] 
  for (let idea of reversedIdeas)  {
    if(lastIdeas.length < 2) {
      lastIdeas.push(idea)
    }

  }
  return res.render("index.html", {ideas: lastIdeas})
})
})
//criei uma rota
// e capturo o pedido do cliente para responder

  server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
      if (err) return console.log (err) 
        
      

      const reversedIdeas = [...rows].reverse()
      return res.render("ideias.html",{ ideas: reversedIdeas })
    })
    })

    server.post("/", function(req, res) {
      //inserir dados na tabela

const query = 
`
INSERT INTO ideas (
  imag ,
  title ,
  category ,
  description ,
  link 

) VALUES (?,?,?,?,?);
`
const values = [
  req.body.image,
  req.body.title,
  req.body.category,
  req.body.description,
  req.body.link,
  
]

db.run(query, values, function(err) {
  if (err) return console.log (err)

 
      return res.redirect("/ideias")
})
    })
     

server.listen(3000);