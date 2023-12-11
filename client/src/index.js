import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import App from "./App";
import Login from "./Login";
import reportWebVitals from "./reportWebVitals";
import Signup from './Signup';
ReactDOM.render(
<Router>
    <Routes>
    <Route path="/" element={<App/>}/>
      <Route path="/signup"  element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>
</Router>,document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
