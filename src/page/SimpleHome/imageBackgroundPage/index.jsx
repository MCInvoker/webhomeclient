import React, { useState, useEffect } from 'react';

import ColorThief from 'colorthief';

import loginImg from '../../LoginRegister/login.jpg';

// 将 RGB 颜色转换为十六进制格式
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

function ImageBackgroundPage () {
    const [bgColor, setBgColor] = useState('');

    useEffect(() => {
        // 获取图片元素
        const imageElement = document.getElementById('mainImage');

        // 创建 ColorThief 实例
        const colorThief = new ColorThief();

        // 从图片中提取颜色
        const imageSrc = imageElement.src;
        console.log('colorThief', colorThief)
        console.log('imageSrc', imageSrc)
        console.log('imageElement', imageElement)
        let dominantColor = null
        if (imageElement.complete) {
            dominantColor = colorThief.getColor(imageElement);
            setBgColor(rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]))
            console.log('dominantColor', dominantColor)
        } else {
            imageElement.addEventListener('load', function () {
                dominantColor = colorThief.getColor(imageElement);
                setBgColor(rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]))
                console.log('dominantColor', dominantColor)
            });
        }

        // 将颜色转换为十六进制格式
        // const hexColor = rgbToHex(dominantColor[0], dominantColor[1], dominantColor[2]);

        // 设置背景色
        // setBgColor(hexColor);
    }, []);



    return (
        <div style={{ backgroundColor: bgColor }}>
            {/* {bgColor} */}
            <img
                width={400}
                height={400}
                id="mainImage"
                src={loginImg}
                alt="Main"
                style={{ boxShadow: '0px 4px 20px 0px rgba(14, 140, 223, 0.6)' }}
            />
            {/* 其他页面内容 */}
        </div>
    );
}

export default ImageBackgroundPage;
