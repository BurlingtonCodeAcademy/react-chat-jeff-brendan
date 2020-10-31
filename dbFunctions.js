const DataStore = require("./data.js")
const uri = `mongodb+srv://BCAadmin:${process.env.DBPASS}@cluster0.npdxy.mongodb.net/test?retryWrites=true&w=majority`;
​
//variables for two chats
//just practice data for now- change to main class
//we pass the url, name and collection, because thats whats defined in our constructor in data
let mainChat = new DataStore
    (uri,
    "MessageDatabase",
     "Records")
​
let sideChat = new DataStore
    (uri, 
    "MessageDatabase",
    "sidechat")
​
​
    //database function here to insert to main chat
​
    const insertMessage =  async (req, res) => {
        let user = req.body.user;
        let time = new Date();
​
        //layout of message body
​
        let newMessage = {
            date = time,
            name = user.name,
            message = user.message
        };
        
    }