import './App.css';
import {  Routes, Route } from "react-router-dom";

import HomePage from './UI/Homepage';
import Authpage from './auth/Authpage';
import UserDashboard from './UI/UserDashboard';
import UploadDocs from './UI/UploadDocs';

function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<Authpage />} />
    <Route path="/user-board" element={<UserDashboard />} />
    <Route path="/upload" element={<UploadDocs />} />


    </Routes>  );
}

export default App;
