import './App.css';
import SimpleHome from './page/SimpleHome';
import Me from './page/Me'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegister from './page/LoginRegister';

function App () {
    return (
        <Router>
            <div className="App">
                <Me></Me>
                <Routes>
                    <Route path="/home" element={<SimpleHome></SimpleHome>} />
                    <Route path="/login" element={<LoginRegister />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// import './App.css';
// import SimpleHome from './page/SimpleHome';
// import LoginRegister from './page/LoginRegister';
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
// import Me from './page/Me';
// import { useEffect, useState } from 'react';

// function App () {
//     const location = useLocation(); // 获取当前路径信息
//     const [showMe, setShowMe] = useState(true);

//     useEffect(() => {
//         // 当路径为'/login'时不显示Me组件
//         setShowMe(location.pathname !== '/login');
//     }, [location]);

//     return (
//         <Router>
//             <div className="App">
//                 { showMe && <Me /> } {/* 条件渲染Me组件 */}
//                 <Routes>
//                     <Route path="/home" element={<SimpleHome />} />
//                     <Route path="/collect" />
//                     <Route path="/login" element={<LoginRegister />} />
//                 </Routes>
//             </div>
//         </Router>
//     );
// }

// export default App;
