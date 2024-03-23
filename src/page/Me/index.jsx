import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css';

function Me () {
    const location = useLocation(); // 获取当前路径信息
    const showMe = useMemo(() => {
        return location.pathname !== '/login';
    }, [location.pathname]);
    if (showMe) {
        return <div className="me">个人中心</div>;
    }
    return null;
}

export default Me;
