import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
import Topnavbar from "./Topnavbar";
import box from "./assets/chatbox.png";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import logo1 from './Group Chat-amico.svg';
import { auth } from "./Firebaseconfig";
import Footer from "./Footer";
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [ch,setch]=useState(false)
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
      //setUser(currentUser.email);
      setch(true)
      }
    });
  },[])
  return (
  <div className="main">
 <Topnavbar/>
 <img className="back" src={logo1}/>
    <div className="App">
    
    {ch ?
       !showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      ) 
      :
      <div className="rightside">
      <img src={box} alt="box" className="addbox"/>
      <h2>Let's Get Started ? </h2>
      <p><a href="/login">Click Here</a></p>
      </div>
      }
    </div>
    <Footer/>
    </div>
  );
}

export default App;
