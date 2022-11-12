import './Canvas.css';
import React, { useEffect, useRef, useState } from 'react';

function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [canvasHasMounted, SetCanvasHasMounted] = useState<boolean | null>(false);

    useEffect(() => {
        if (canvasHasMounted) {
            console.log(canvasRef)
            const canvas : HTMLCanvasElement | null = canvasRef.current;
            if (!canvas) { }
            else {
                const context = canvas.getContext('2d');
                context!.fillStyle = '#000000'
                context!.fillRect(0, 0, context!.canvas.width, context!.canvas.height)
            }
        } else {
            SetCanvasHasMounted(true)  
        }
    }, [canvasHasMounted])


    return (
        <>
            <canvas ref={canvasRef}></canvas>
        </>
    );
}

export default Canvas;
