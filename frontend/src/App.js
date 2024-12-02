import './App.css';
import {  Routes, Route } from "react-router-dom";

import HomePage from './UI/Homepage';
import Authpage from './auth/Authpage';

function App() {
  return (
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/auth" element={<Authpage />} />


    </Routes>  );
}

export default App;
