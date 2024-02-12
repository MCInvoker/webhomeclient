import React, { useState } from 'react';

import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function HoverDelete({ children, showDelayTime = 2000, hiddenDelayTime = 2000, handleDelete }) {
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
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showIcon && (
        <span
          onClick={handleDelete}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            cursor: 'pointer',
            background: '#fff',
            padding: '5px',
          }}
        >
          <Button shape="circle" icon={<DeleteOutlined />} />
        </span>
      )}
    </div>
  );
}

export default HoverDelete;
