import React from "react";
import "./Main.css";
function Main() {
  return (
    <div>
	{/*This Creates the container that Holds  the front page */}
      <div className="join-container">
        <header className="join-header">
          <h1>ReactChat</h1>      {/*Title of the chat */}
        </header>
        <main className="join-main"> {/* Main container for the form.*/}
         {/* Start o f the form */}
		  <form> 
            <div className="form-control"> {/*This first form is for the username to be enter. */}
              <label htmlFor="username">Username</label>
			  {/*This makes the form name to be required */}
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required    
              />
            </div>
            <div className="form-control">  {/* This second form is for the list of the rooms chanels */}
              <label htmlFor="room">Room</label>
              <select name="room" id="room">
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="PHP">PHP</option>
                <option value="C#">C#</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
              </select>
            </div>
            <button type="submit" className="btn"> {/*This is the buttton that submits the form. */}
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Main;