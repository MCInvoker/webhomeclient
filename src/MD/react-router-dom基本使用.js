// react-router-dom 使用实例

// 在React中使用react-router-dom v6来创建具有嵌套路由的应用程序时，你需要遵循一些基本步骤。这里给你一个示例代码，展示如何实现这样的结构。
// 首先，确保你已经安装了react-router-dom v6。如果还没有安装，可以使用以下命令进行安装：
// npm install react-router-dom

// 以下是一个基本的示例，展示了如何在React应用中使用嵌套路由：
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// 定义一些基本组件
function Home () {
    return <h2>主页</h2>;
}

function About () {
    return <h2>关于</h2>;
}

function Topics () {
    return (
        <div>
            <h2>主题列表</h2>
            <ul>
                <li>
                    <Link to="topic1">主题1</Link>
                </li>
                <li>
                    <Link to="topic2">主题2</Link>
                </li>
            </ul>

            <Routes>
                <Route path=":topicId" element={<Topic />} />
            </Routes>
        </div>
    );
}

function Topic () {
    return <h3>选定的主题</h3>;
}

// 应用的主组件
function App () {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">主页</Link>
                        </li>
                        <li>
                            <Link to="/about">关于</Link>
                        </li>
                        <li>
                            <Link to="/topics">主题</Link>
                        </li>
                    </ul>
                </nav>

                {/* 设置路由和对应组件 */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/topics/*" element={<Topics />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;


// 在这个例子中，App 组件是主入口点，它使用<Router>来包围整个应用。<Routes>和<Route>用于定义路由规则。Topics组件内部还有一个嵌套的<Routes>，用于处理/topics下的子路由。
// 这个例子展示了一个基本的嵌套路由结构，在实际应用中，你可以根据需求调整路由的结构和组件的逻辑。