require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//middleware
app.use(express.urlencoded({extended: true }));
//app.use(express.static("./public"))    <---- do we need this?
app.use(express.static(staticDir));

//Database integration 
const MessageStore = require("./data.js");
let myDb = new MessageStore(`mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`, "library", "inventory");

//routes


//set up an API endpoint that reads from database, and sends JSONs to endpoint
app.get("/allrecords", async (req, res) => {
  let results = await myDb.run()
  res.send(results)
})

//show all records
app.get("/allrecords", async (req, res) => {
  res.sendFile(path.resolve("./public/placeholder.html"))
})


//need api endpoint for serving a single file from homepage main chat
app.get('/placeholder/:id', (req, res) => {
  let record = await myDb.showOne(req.params.id)
  res.send(record)
})

//require an api endpoint for serving all the files in side chat

//require an api endpoint for serving a single file from side chat

//remove record




app.listen(port, () => {
  console.log('listening on port: ' + port) 
})