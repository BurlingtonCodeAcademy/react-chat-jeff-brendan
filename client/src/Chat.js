import React from 'react' 
import ReactDOM from 'react-dom'
import "./Chat.css"




function fetchAllData() {
  fetch("./allrecords").then((res) => {
    return res.json();
  }).then((jsonObj) => {
    console.log(jsonObj);
    jsonObj.forEach((id) => {
      let userMsg = id;
      let message = userMsg.DbBody
      let author = userMsg.DbAuthor
      let msgtime = userMsg.DbWhen
      const msgList =  message.map(`<li>${message}</li>`)
      
      

      // console.log(msgList)
      // ReactDOM.render(msgList, document.getElementById('chat-messages'))    
      document.getElementsById('chat-messages').apppendChild(msgList)
    })
  })
}
fetchAllData()

function Chat() {
    return (
        <div>
    <div className="chat-container">
      <header className="chat-header">
        <h1>ReactChat</h1>
        <a href="#" className="btn">Leave Room</a> {/*This is the button to leave the room and go back to the main page */}
      </header>
      <main className="chat-main">
        <div className="chat-sidebar">
          <h3>Room Name:</h3>
          <h2 id="room-name">Java-Script</h2> {/*Delete what is inside, update wen the person chooses a page. */}
          <h3>Users</h3>
          <ul id="users"> {/*Delete the list bellow, here is were it goes the name off the person that login into the page */}
              <li>Matheus</li>
              <li>Brendan</li>
              <li>Jeff</li>
          </ul>
        </div>
        <ul id="chat-messages"></ul> {/*This is were the msg should be displayed */}
      </main>
      <div className="chat-form-container"> {/*This is the form input for the chat  */}
        <form id="chat-form">
          <input
            id="msg"
            type="text"
            placeholder="Enter Message"
            required
            autoComplete="off"
          />
          <button className="btn"> Send</button> {/*The button that  will send the msg to the chat. */}
        </form>
      </div>
    </div>
  </div>
    )
}
export default Chat

