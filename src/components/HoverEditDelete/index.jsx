import React, { useState } from 'react';

import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function HoverEditDelete ({
    children,
    showDelayTime = 500,
    hiddenDelayTime = 3000,
    handleEdit,
    handleDelete,
    positionStyle = {},
    deleteTitle = '删除',
    deleteDescription = '确定要删除吗?',
    buttonType = 'text',
    editButtonStyle = {},
    draggableing = false, // 拖拽进行时不展示
}) {
    const [showIcon, setShowIcon] = useState(false);
    let hoverTimer;
    let leaveTimer;

    const handleMouseEnter = () => {
        hoverTimer = setTimeout(() => {
            setShowIcon(true);
        }, showDelayTime);
    };
    const handleMouseLeave = () => {
        clearTimeout(hoverTimer);

        leaveTimer = setTimeout(() => {
            setShowIcon(false);
            clearTimeout(leaveTimer);
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
