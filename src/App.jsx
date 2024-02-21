import './App.css';
import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SimpleHome from './page/SimpleHome/index';
import Me from './page/Me/index';
import LoginRegister from './page/LoginRegister';

function App() {
  return (
    <Router>
      <div className="App">
        <Me />
        <Routes>
          <Route path="/home" element={<SimpleHome />} />
          <Route path="/login" element={<LoginRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
