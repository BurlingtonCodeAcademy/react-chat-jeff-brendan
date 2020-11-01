// importing React and CSS 
import React, {useState}  from "react";
import "./Chat.css";
 

// this function generates a a message as a list item 
function ChatItem({ message }) {
  return (
    <li>
      {message.DbAuthor}: {message.DbBody}
    </li>
  );
}
// this is the template message component
class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
// this fetchs data from all records
  render() {
    setInterval(() => {
      fetch("./allrecords")
        .then((res) => {
          return res.json();
        })
        .then((jsonObj) => {
          this.setState({ messages: jsonObj });
        });
    }, 15000);    // <--- we are refreshing the loop every 15 seconds 
//then returns the data as an unorder list
    return (
      <ul id="chat-messages">
        {this.state.messages.map((message1) => (
          <ChatItem message={message1} />
        ))}
      </ul>
    );
  }
}
// this function generates our html for our chat 
function Chat() {
  return (
    <div>
      <div className="chat-container">
        <header className="chat-header">
          <h1>ReactChat</h1>
          <a href="#" className="btn">
            Leave Room
          </a>{" "}
          {/*This is the button to leave the room and go back to the main page */}
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>Room Name:</h3>
            <h2 id="room-name">Java-Script</h2>{" "}
            {/*Delete what is inside, update wen the person chooses a page. */}
            <h3>Users</h3>
            <ul id="users">
              {" "}
              {/*Delete the list bellow, here is were it goes the name off the person that login into the page */}
              <li>Matheus</li>
              <li>Brendan</li>
              <li>Jeff</li>
            </ul>
          </div>
          <ChatMessage />
        </main>
        <div className="chat-form-container">
          {" "}
          {/*This is the form input for the chat  */}
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
            />
            <button className="btn"> Send</button>{" "}
            {/*The button that  will send the msg to the chat. */}
          </form>
        </div>
      </div>
    </div>
  );
}
//exporting chat as a component 
export default Chat;
