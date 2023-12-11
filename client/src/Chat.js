import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [uniusers,setuniusers]=useState([])

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data]);
      /* if(data){
        filterUser();
      } */
    });
    
  }, [socket]);
  const filterUser=(data)=>{
    const temparr =[];
    messageList.map((x) => temparr.push(x.author));
    console.log(temparr)
    const uniq = temparr.filter(onlyUnique);
    console.log(uniq)
    setuniusers(uniq)

  }
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat - Members {uniusers.map(x=>{
          return (
            <>{x }</>
          )
        })} 
        <br/>
        Room Id :  {messageList[0]?.room} </p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}> &#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
