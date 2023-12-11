import React, { useState ,useEffect} from 'react'
import {
  BrowserRouter as Router,
  Link,
  Navigate
} from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebaseconfig";
import logo from './wechat.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Topnavbar = () => {

  const [user1, setUser1] = useState('notauthentic');
  const [user2, setUser2] = useState('authentic');
  const [user, setUser] = useState('');
  const [ch,setch]=useState(false)
  let navigate =  useNavigate()
  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
      setUser(currentUser.email);
      setch(true)
      console.log(currentUser);
      console.log(currentUser.email);
      }else{
        console.log('loggedout');
      }
      
    });
  },[])

  const logout = async () => {
    console.log('logout')
    await signOut(auth);
    Swal.fire({
      title: 'logged out Bye !',
      icon: 'success'
  })
  setTimeout(()=>{
    window.location.reload(true)
  },1500)
    
  };
  return (
    <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand p-2" href="#" style={{fontSize : '24px'}}> 
    <img src={logo} style={{width :'65px', height: '55px',margin:'0 10px 0 10px', padding :'0'}}/> Wechat</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
        
      </ul>
   
    <div className={ch ? user1 : user2}>
      <Link to="/signup"><button class="btn btn-primary pl-2 m-2"><i className="fa fa-user"/> Sign Up </button></Link>
      <Link to="/login"><button class="btn btn-primary pl-2 m-2"><i className="fa fa-sign-in"/> Sign In / Login</button> </Link>
    </div>
    <div className={ch ? user2 : user1}>
     <label><i className="fa fa-user" style={{padding: '10px 12px',borderRadius:'32px',margin: '10px',backgroundColor:'#ccc'}}></i>Hi, {user} 
     <i class="fa fa-sign-out" style={{padding: '10px 12px',margin: '10px',backgroundColor:'#0099e3',color: '#fff'}} onClick={logout}></i></label>
    </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default Topnavbar