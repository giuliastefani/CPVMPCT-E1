import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const PixelatedImage = ({ src, pixelSize = 1, width = 200, height = 200 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = width;
            canvas.height = height;
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(img, 0, 0, width / pixelSize, height / pixelSize);
            ctx.drawImage(
                canvas,
                0,
                0,
                width / pixelSize,
                height / pixelSize,
                0,
                0,
                width,
                height
            );
        };

        img.src = src;
    }, [src, pixelSize, width, height]);

    return <canvas ref={canvasRef} width={width} height={height} />;
};

PixelatedImage.propTypes = {
    src: PropTypes.string.isRequired,
    pixelSize: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
};

export default PixelatedImage;
