import './Canvas.css';
import React, { useEffect, useRef, useState } from 'react';
import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg';

function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [canvasHasMounted, SetCanvasHasMounted] = useState<boolean | null>(false);

    let frameCount = 0;
    let animationFrameID: number;

    let cols = 10;
    let row = 10;
    let w, h;


    let image = new Image();
    image.src = imgURL;

    const draw = (ctx : CanvasRenderingContext2D, frameCount : number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        
        ctx.fillStyle = '#739173'
        ctx.fillRect(0, 0, ctx!.canvas.width, ctx!.canvas.height)

        ctx.fillStyle = '#000000'
        ctx.beginPath()
        // ctx.arc(100, 100, 20, 0, 2*Math.PI)
        ctx.arc(150, 150, 20*Math.sin(frameCount*0.03)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        if (canvasHasMounted) {
            console.log(canvasRef)
            const canvas : HTMLCanvasElement | null = canvasRef.current;
            if (canvas) {
                const context = canvas.getContext('2d');
                if (context) {
                    const render = () => {
                        frameCount++
                        draw(context, frameCount)
                        animationFrameID = window.requestAnimationFrame(render)
                    }
                    render()

                    return () => {
                        window.cancelAnimationFrame(animationFrameID)
                    }
                }
            }
        } else {
            SetCanvasHasMounted(true)  
        }


    }, [canvasHasMounted, draw])


    return (
        <>
            <canvas ref={canvasRef} height={400} width={400}></canvas>
            <div draggable="true">
            <img src={imgURL}></img>

            </div>
        </>
    );
}

export default Canvas;
