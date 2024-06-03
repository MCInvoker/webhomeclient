import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ConfigProvider } from 'antd';

// import Me from './page/Me/index';
import GetRouter from './components/GetRouter';
import UseAuth from './components/UseAuth';

function App () {
    return (
        <Router>
            <div className="App">
                <ConfigProvider
                    theme={{
                        components: {
                            Modal: {
                                colorBgMask: "rgba(0, 0, 0, 0)",
                                contentBg: "#f5f6f7",
                                footerBg: "#f5f6f7",
                                headerBg: "#f5f6f7",
                                marginXS: '16px',
                                footerMarginTop: '16px',
                                borderRadiusLG: '12px',
                                contentPadding: '16px',
                                algorithm: true, // 启用算法
                            }
                        },
                    }}
                >
                    {/* <Me /> */}
                    <UseAuth>
                        <GetRouter />
                    </UseAuth>
                </ConfigProvider>
            </div>
        </Router >
    );
}

export default App;
