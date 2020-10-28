require("dotenv").config();
const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();
const staticDir = process.env.DEV ? "./client/public" : "./client/build";

const DataStore = require("./data.js");
let myDb = new DataStore(`mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`, "library", "inventory");

app.use(express.static(staticDir));



app.listen(port, () => {
  console.log('listening on port: ' + port) 
})