import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CryptoJS, { AES } from 'crypto-js';
function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [uniusers,setuniusers]=useState([])

  const generateSecretKey = () => {
    const keyLength = 32; // 32 bytes = 256 bits (AES-256)
    const buffer = new Uint8Array(keyLength);
    crypto.getRandomValues(buffer);
   /*  return Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join(''); */
    return "";
};
  // Place the 'encryptData' function in your project
const encryptData = (data, secretKey) => {
  const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

const decryptData = (encryptedData, secretKey) => {
  const decryptedData = AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

  const sendMessage = async () => {
    let secretKey = "qwertyuiopasdfgh";
    const encrypted_msg = await encryptData(currentMessage,secretKey);
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: encrypted_msg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      const newmessageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      }
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, newmessageData]);
      setCurrentMessage("");
      filterUser();
    }
  };

  useEffect(() => {
    socket.on("receive_message", async(data) => {
      let secretKey = "qwertyuiopasdfgh";
      const decrypted_msg = await decryptData(data.message,secretKey)
      const newObj = {
        author:data.author,
        message:decrypted_msg,
        room:data.room,
        time:data.time
      }
      setMessageList((list) => [...list,newObj]);
    });
    filterUser();
  }, [socket]);


  const filterUser=()=>{
      const temparr =[];
      messageList.map((x) => temparr.push(x.author));
      const uniq = temparr.filter(onlyUnique);

      setuniusers(uniq)
    
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat
        <br/>
        Room Id :  {room} 
        <br/>
        Members :
        {uniusers.map(x=>{
          return (
            <span className="users">{x}</span>
          )
        })} 
        </p>
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
