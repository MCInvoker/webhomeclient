import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Me from './page/Me/index';
import GetRouter from './components/GetRouter';
import UseAuth from './components/UseAuth';

function App() {
  return (
    <Router>
      <div className="App">
        <Me />
        <UseAuth>
          <GetRouter />
        </UseAuth>
      </div>
    </Router>
  );
}

export default App;
