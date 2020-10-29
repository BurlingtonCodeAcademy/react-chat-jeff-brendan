require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

//middleware
app.use(express.urlencoded({extended: true }));
//app.use(express.static("./src"))    <---- do we need this?
app.use(express.static(staticDir));

//Database integration 
const MessageStore = require("./data.js");
let myDb = new MessageStore(`mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`, "library", "inventory");

//routes


//set up an API endpoint that reads from database, and sends JSONs to endpoint


//show all records



//need api endpoint for serving a single file from homepage main chat

//require an api endpoint for serving all the files in side chat

//require an api endpoint for serving a single file from side chat

//remove record




app.listen(port, () => {
  console.log('listening on port: ' + port) 
})