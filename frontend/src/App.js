import './App.css';
import {  Routes, Route } from "react-router-dom";

import HomePage from './UI/Homepage';
import Authpage from './auth/Authpage';
import UserDashboard from './UI/UserDashboard';
import UploadDocs from './UI/UploadDocs';
import UserVerification from './UI/UserVerification';
import UserNavbar from './UI/Navbar';
import VerifyEmail from './UI/VerifyEmail';

function App() {
  const userType = localStorage.getItem("userType")
  const loggedIn = localStorage.getItem("loggedIn")

  return (<>
     {   userType === "user" &&  loggedIn === "true" && <UserNavbar/> } 

    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<Authpage />} />
    <Route path="/user-board" element={<UserDashboard />} />
    <Route path="/upload" element={<UploadDocs />} />
    <Route path="/verify" element={<UserVerification />} />
    <Route path="/verify-email/:token" element={<VerifyEmail />} />


    </Routes> 
    
    </>
 );
}

export default App;
