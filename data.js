const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const uri = `mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`;

// prevent data deprecation
//mongoose.set('useUnifiedTopology', true)
//mongoose.set('useNewUrlParser', true)

//mongo connection constructor
const client = new MongoClient(uri, { useUnifiedTopology: true });

//define the current date with internal Javascript clock
let time = new Date();
// breaks down the current date by hours/minutes/seconds
let timeStamp =
  time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
class MessageStore {
  constructor(DbBody, DbAuthor) {
    this.DbWhen = timeStamp;
    this.DbBody = DbBody;
    this.DbAuthor = DbAuthor;
  }
}
//---------------------------OLD LOGIC---------------------------------//

// //logic for viewing
// if (question === "view") {
//  await collection.find({}).forEach((records) => {
//    console.log(records);
//  });
// } else if (question === "add") {
//  let recordsBody = await ask("What are you wanting to say? ");
//  let recordsName = await ask("Who are you? ");

//  await collection.insertOne({
//    DbBody: recordsBody,
//    DbAuthor: recordsName,
//    DbWhen: timeStamp
//  });

//---------------------------NEW LOGIC---------------------------------//
class DataStore {
  constructor(dbURL, dbName, dbCollection) {
    this.dbURL = dbURL;
    this.dbName = dbName;
    this.dbCollection = dbCollection;
    this.dbClient = null;
  }
  async run() {
    console.log("serving on " + this.dbURL);
    if (this.dbClient && this.dbClient.isConnected()) {
      return this.dbClient;
    } else {
      this.dbClient = await MongoClient.connect(this.dbURL, {
        useUnifiedTopology: true,
      });
      console.log("connected to the database");
      return this.dbClient;
    }
  }
  async collection() {
    // connect to mongo process
    const client = await this.run();
    // choosing our database
    const db = client.db(this.dbName);
    //const collection = db.collection("Records");
    const collection = db.collection(this.dbCollection);

    return collection;
  }

  // VIEWING ALL MESSAGES
  async viewAll() {
    let collection = await this.collection();
    return collection.find({});
    //need a seperate view all for other chat room collection
  }

  // SENDING A MESSAGE
  async addMessage(message) {
    //defines an object called response
    let response = { status: null, error: null };
    //try catch block
    try {
      let collection = await db.collection(this.dbCollection);
      console.log("adding item");
      await collection.insertOne(message);
      console.log("Success on message");
      //status to terminal
      response.status = "ok";
      //else catch the error
    } catch (error) {
      response.error = error.toString();
      console.log(error.toString());
    }
    //returns object defined at top
    return response;
  }

  //DELETE A MESSAGE
  async deleteMessage(id) {
    let collection = await this.collection();
    let idObj = new ObjectId(id);
    await collection.deleteOne({ _id: idObj });
  }
}
// our connection function to the database

module.exports = { MessageStore, DataStore };
