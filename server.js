require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
app.use(bodyParser.json());
app.use(bodyParser.raw());

//middleware
app.use(express.urlencoded({ extended: true }));
//app.use(express.static("./public"))    <---- do we need this?
app.use(express.static(staticDir));

//Database integration
const {DataStore} = require("./data.js");
let ourDb = new DataStore(
  `mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`,
  "MessageDatabase",
  "Records"
);



//set up an API endpoint that reads from database, and shows all results in connection
app.get("/allrecords", async (req, res) => {
  let results = await ourDb.viewAll();
  let newRest = await results.toArray()
  console.log("from server: ", newRest)
  res.send(newRest);
});

//require an api endpoint for serving all the files in side chat
app.get("/siderecords", async (req, res) => {
  res.sendFile(path.resolve(staticDir));
});

//api endpoint for serving a single file from homepage main chat
// app.get('/placeholder/:id', async (req, res) => {
//   let record = await myDb.showOne(req.params.id)
//   res.send(record)
// })

//Path to App.js
app.get("*", async (req, res) => {
  res.sendFile(path.resolve(staticDir));
});

//insert message to home page
app.post("/entry", async (req, res) => {
  let submission = req.body;
  console.log(submission);
  ourDb.addMessage(submission);
  res.send("Form submitted successfully");
});

//require an api endpoint for serving a single file from side chat

// we need to send a message and have it display on message chat rOOM
// when choosing room, load chat for that room
// be able to see that our messages are saving in database now that we are working off of terminal
// Need to make a component for front end to fetch api endpoint
// need to rewrite how we define our Database obj 
// 

// this is our listener and lets you know in console if the server is live
app.listen(port, () => {
  console.log("listening on port: " + port);
});
