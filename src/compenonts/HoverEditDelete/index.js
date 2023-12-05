import React, { useState } from "react";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const HoverEditDelete = ({
    children,
    showDelayTime = 2000,
    hiddenDelayTime = 2000,
    handleEdit,
    handleDelete,
    top = 0,
    right = 0,
}) => {
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
            style={{ position: "relative", display: "inline-block" }}
        >
            {children}
            {showIcon && (
                <span
                    style={{
                        position: "absolute",
                        top,
                        right,
                        cursor: "pointer",
                        // background: "#f5f5f5",
                        background: "#fff",
                        padding: "10px",
                        borderRadius: '5px',
                        boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    <Button style={{ marginRight: '8px' }} shape="circle" icon={<EditOutlined />} onClick={() => handleEdit && handleEdit()} />
                    <Button shape="circle" icon={<DeleteOutlined />} onClick={() => handleDelete && handleDelete()} />
                </span>
            )}
        </div>
    );
};

export default HoverEditDelete;
