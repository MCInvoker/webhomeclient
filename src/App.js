import './App.css';
import SimpleHome from './page/SimpleHome';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Me from './page/Me';


function App () {
    return (
        <Router>
            <div className="App">
                <Me></Me>
                {/* <SimpleHome></SimpleHome> */}
                <Routes>
                    <Route path="/home" element={<SimpleHome></SimpleHome>} />
                    <Route path="/collect" />
                </Routes>
            </div>

        </Router>
    );
}

export default App;

// App.js
// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Home from './Home';
// import About from './About';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Route path="/" exact component={Home} />
//         <Route path="/about" component={About} />
//       </div>
//     </Router>
//   );
// };

// export default App;