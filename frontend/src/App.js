import './App.css';
import {  Routes, Route } from "react-router-dom";

import HomePage from './UI/Homepage';
import Authpage from './auth/Authpage';
import UserDashboard from './UI/UserDashboard';
import UploadDocs from './UI/UploadDocs';
import UserVerification from './UI/UserVerification';
import UserNavbar from './UI/Navbar';

function App() {
  const userType = localStorage.getItem("userType")
  const loggedIn = localStorage.getItem("loggedIn")
  console.log(userType)
  console.log(loggedIn)

  return (<>
     {   userType === "user" &&  loggedIn === "true" && <UserNavbar/> } 

    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<Authpage />} />
    <Route path="/user-board" element={<UserDashboard />} />
    <Route path="/upload" element={<UploadDocs />} />
    <Route path="/verify" element={<UserVerification />} />


    </Routes> 
    
    </>
 );
}

export default App;
