import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./Firebaseconfig";
import './Login.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
const Login = () => {   
      const [lemail, setlemail] = useState('');
      const [lpassword,setlpassword]= useState('');
      const [user, setUser] = useState({});
      let navigate = useNavigate()
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });

      const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            lemail,
            lpassword
          );
          Swal.fire({
            title: 'Successfully logged in',
            icon: 'success'
        }
        )
          setTimeout(()=>{
            navigate('/')
          },1000)
        } catch (error) {
          Swal.fire({
            title: error.message,
            icon: 'warning'
        }
        )
        }
      };
    
      const logout = async () => {
        await signOut(auth);
      };
  return (
      <>
    <div className="container" id="container">
    <div className="form-container log-in-container">
        <div id="email" className="email">
            <a href="#"><h1>Login</h1></a>
            <div className="social-container">
                <a href="#" className="social"><i className="fa fa-envelope fa-2x"></i></a>
            </div>
            <span>or use your account</span>
            <input type="email" placeholder="Email" id="semail" onChange={e=> setlemail(e.target.value) }/>
            <input type="password" placeholder="Password" id="spassword" onChange={e=> setlpassword(e.target.value) }/>
          
            <button className="mt-2" onClick={login}>LOG IN</button>
        </div>


    </div>
    <div className="overlay-container">
        <div className="overlay">
            <div className="overlay-panel overlay-right">
                <h1>Wechat Application</h1>
                <p>Login and chat instantly with your loved once.</p>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Login