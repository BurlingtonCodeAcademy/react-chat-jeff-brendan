const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();
const uri = `mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`

// prevent data deprecation
//mongoose.set('useUnifiedTopology', true)
//mongoose.set('useNewUrlParser', true)

//mongo connection constructor
const client = new MongoClient(uri, { useUnifiedTopology: true });

//importing readline
const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

//defining 'ask' & Promises
function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}
//define the current date with internal Javascript clock
let time = new Date()
// breaks down the current date by hours/minutes/seconds
let timeStamp = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
class MessageStore {
  constructor (DbBody, DbAuthor) {
    this.DbWhen = timeStamp;
    this.DbBody = DbBody;
    this.DbAuthor = DbAuthor;
  }
}

async function run() {
  // connect to mongo process
  await client.connect();
  // choosing our database
  const db = client.db("MessageDatabase");
  // choosing a collection
  const collection = db.collection("Records");
  
  let question = await ask(
    "\n\nWould you like to 'view', 'delete', 'add', or 'update' the current records?"
  );

  //logic for viewing
  if (question === "view") {
    await collection.find({}).forEach((records) => {
      console.log(records);
    });
  } else if (question === "add") {
    let recordsBody = await ask("What are you wanting to say? ");
    let recordsName = await ask("Who are you? ");
    
    await collection.insertOne({
      DbBody: recordsBody,
      DbAuthor: recordsName,
      DbWhen: timeStamp
    });
  } else if (question === 'delete') {
      await collection.find({}).forEach(records => {
          console.log(records.DbAuthor + ':')
          console.log(records._id)
          // how do we console log time stamp here 
      })
      let target = await ask('Which record are you trying to delete? ')
      let id = ObjectId(target.trim())

      await collection.deleteOne({_id: id})
  }
  process.exit()
}
run();
