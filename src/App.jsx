import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SimpleHome from './page/SimpleHome';
import Me from './page/Me/index';
import LoginRegister from './page/LoginRegister';

function App() {
  return (
    <Router>
      <div className="App">
        <Me />
        <Routes>
          {/* http://localhost:3000/home?page_id=1 */}
          <Route path="/home" element={<SimpleHome />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
