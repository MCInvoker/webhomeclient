import React, { useState, useEffect, useCallback } from "react";

// const HoverDelete = ({ children, n = 3, handleDelete }) => {
const HoverDelete = ({
    children,
    showDelayTime = 2000,
    hiddenDelayTime = 2000,
    handleDelete,
}) => {
    const [showIcon, setShowIcon] = useState(false);
    let hoverTimer;
    let leaveTimer;

    //   handleMouseEnter
    // const handleMouseEnter = useCallback(() => {
    //     return
    // }, [showDelayTime])
    // let handleMouseEnter = () => {
    //     console.log(123)
    // }
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

    //   useEffect(() => {
    //     let hoverTimer;
    //     let leaveTimer;

    //     handleMouseEnter = () => {
    //         console.log('handleMouseEnter')
    //       hoverTimer = setTimeout(() => {
    //         setShowIcon(true);
    //       }, n * 1000);
    //     };

    //     handleMouseLeave = () => {
    //       clearTimeout(hoverTimer);

    //       leaveTimer = setTimeout(() => {
    //         setShowIcon(false);
    //       }, n * 1000);
    //     };

    //     return () => {
    //       clearTimeout(hoverTimer);
    //       clearTimeout(leaveTimer);
    //     };

    //   }, [n]);

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ position: "relative", display: "inline-block" }}
        >
            {children}
            {showIcon && (
                <span
                    onClick={handleDelete}
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                        background: "#fff",
                        padding: "5px",
                    }}
                >
                    🗑️
                </span>
            )}
        </div>
    );
};

export default HoverDelete;
