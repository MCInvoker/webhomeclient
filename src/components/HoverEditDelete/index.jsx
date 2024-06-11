import React, { useState } from 'react';

import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function HoverEditDelete ({
    children,
    showDelayTime = 500, // 显示这个组件需要悬浮的时间
    hiddenDelayTime = 3000, // 移开后多少秒隐藏
    handleEdit,
    handleDelete,
    positionStyle = {},
    deleteTitle = '删除',
    deleteDescription = '确定要删除吗?',
    buttonType = 'text',
    editButtonStyle = {},
    draggableing = false, // 拖拽进行时不展示
    transitionDuration = 1, // 淡入淡出动画持续时间
}) {
    const [showIcon, setShowIcon] = useState(false);
    const [opacity, setOpacity] = useState(0);
    let hoverTimer;
    let leaveTimer;
    let hoverOpacityTimer;
    let leaveOpacityTimer;

    const handleMouseEnter = () => {
        hoverTimer = setTimeout(() => {
            setShowIcon(true);
        }, showDelayTime);
        hoverOpacityTimer = setTimeout(() => {
            setOpacity(1);
        }, (showDelayTime + 100));
    };
    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);
        clearTimeout(hoverOpacityTimer);

        leaveTimer = setTimeout(() => {
            setShowIcon(false);
            clearTimeout(leaveTimer);
        }, (hiddenDelayTime + transitionDuration * 1000));

        leaveOpacityTimer = setTimeout(() => {
            setOpacity(0);
            clearTimeout(leaveOpacityTimer);
        }, hiddenDelayTime);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: 'relative', display: 'inline-block', width: '100%', height: '100%' }}
        >
            {children}
            {!draggableing && showIcon && (
                <div
                    style={{
                        position: 'absolute',
                        background: '#fff',
                        padding: '4px',
                        borderRadius: '8px',
                        border: '1px solid #ededee',
                        zIndex: 1,
                        boxShadow:
                            '0 2px 8px 0 rgba(30, 30, 35, 0.08)',
                        opacity: opacity, // 控制透明度
                        transition: `opacity ${transitionDuration}s ease`, // 设置过渡效果
                        ...positionStyle,
                    }}
                >
                    <Button
                        style={{ marginRight: '4px', ...editButtonStyle }}
                        type={buttonType}
                        icon={<EditOutlined />}
                        onClick={() => handleEdit && handleEdit()}
                    />
                    <Popconfirm
                        title={deleteTitle}
                        description={deleteDescription}
                        onConfirm={async () => handleDelete && handleDelete()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button
                            type={buttonType}
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </div>
            )}
        </div>
    );
}

export default HoverEditDelete;
