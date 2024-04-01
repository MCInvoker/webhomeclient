import React, { useState, useRef } from 'react';

import './index.css'; // 引入相关的CSS
import classNames from 'classnames';

function DragToUnlock({ onSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const sliderRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [offset, setOffset] = useState(0); // 解决拖动一开始弹射起步的感觉

  const handleMouseDown = (e) => {
    if (isSuccess) return;
    setOffset(e.clientX - sliderRef.current.offsetLeft);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newPosition = Math.min(
        Math.max(0, e.clientX - sliderRef.current.offsetLeft - offset),
        sliderRef.current.offsetWidth - 40,
      );
      setPosition(newPosition);
      if (newPosition >= sliderRef.current.offsetWidth - 40) {
        // 40是滑块的宽度
        setIsDragging(false);
        onSuccess(); // 验证成功的回调
        setIsSuccess(true);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setPosition(0); // 重置位置
      setIsDragging(false);
    }
  };

  return (
    <div className="slider-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseUp}>
      <div
        className={classNames({
          'slider-bar': true,
          'slider-bar-success': isSuccess,
        })}
        ref={sliderRef}
      >
        <div className="slider-tip">{isSuccess ? '验证通过' : '按住滑块，拖动到最右边'}</div>
        {!isSuccess && <div className="sliderfff" style={{ width: `${position + 8}px` }} />}
        <div
          className="slider-button"
          style={{ left: `${position}px` }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {isSuccess ? (
            <i className="iconfont icon-chenggong chenggong" />
          ) : (
            <i className="iconfont icon-toRight toRight" />
          )}
        </div>
      </div>
    </div>
  );
}

export default DragToUnlock;
