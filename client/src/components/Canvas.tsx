import './Canvas.css';
import React, { useEffect, useRef, useState } from 'react';
import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg';
import { couldStartTrivia } from 'typescript';


function Canvas() {

    class Tile {
        index : number
        image : string
        
        constructor(i : number, img : string) {
            this.index = i;
            this.image = img
        }
    }
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [canvasHasMounted, SetCanvasHasMounted] = useState<boolean | null>(false);

    // let frameCount = 0;
    // let animationFrameID: number;
    
    let image = new Image();
    image.src = imgURL;
    console.log(image.height)

    let cols = 10,
        rows = 10,
        width = image.width,
        height = image.height,
        tileW = width / cols /2,
        tileH = height / rows /2;

    let tiles : Array<Object> = [];
    let board : Array<number> = [];
        
        
        function setup(canvas : HTMLCanvasElement, context : CanvasRenderingContext2D) {
            
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                // let img = new Image(tileW, tileH)
                
                context.drawImage(image, tileW*i*2, tileH*j*2, tileW*2, tileH*2, tileW*i, tileH*j, tileW, tileH)
                let index = j + i * cols;
                board.push(index);
                let tile  = new Tile(index, canvas.toDataURL())
                tiles.push(tile)
                console.log(tile)
                // context.clearRect(0, 0, canvas.width, canvas.height);
               
                // console.dir(canvas.toDataURL())
            }
        }
        shuffle(board)
    }

    function swap(i : number, j : number, arr : Array<number>) {
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }

    function shuffle(arr : Array<number>) {
        for (let i = 0; i < 100; i++) {
            let r1 = Math.floor(Math.random() * arr.length)
            let r2 = Math.floor(Math.random() * arr.length)
            swap(r1, r2, arr)
        }
    }


    const draw = (ctx : CanvasRenderingContext2D) => {
     
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let index = j + i * cols;
                let x = tileW*i,
                    y = tileH*j;
                // let tileIndex = board[index]
                // let img = tiles[tileIndex].image
                // let image = new Image();
                // image.src = img;
                // ctx.drawImage(image, tileW, tileH)


                ctx.strokeStyle = "white"
                ctx.strokeRect(x, y, tileW, tileH)
            }
        } 
    }

    useEffect(() => {
        if (canvasHasMounted) {
            console.log(canvasRef)
            const canvas : HTMLCanvasElement | null = canvasRef.current;

            if (canvas) {
                const context = canvas.getContext('2d');
                
                if (context) {
                    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
                    context.fillStyle = '#739173'
                    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
                    
                    setup(canvas, context)
                    
                    console.log(board)
                    // console.log(imagePieces)
                    const render = () => {
                        // frameCount++
                        draw(context)
                        // animationFrameID = window.requestAnimationFrame(render)
                    }
                    render()

                    // return () => {
                    //     window.cancelAnimationFrame(animationFrameID)
                    // }
                }
            }
        } else {
            SetCanvasHasMounted(true)  
        }


    }, [canvasHasMounted, /*draw*/])


    return (
        <>
            <canvas ref={canvasRef} height={height/2} width={width/2}></canvas>
            <div draggable="true">
            {/* <img src={imgURL}></img> */}

            </div>
        </>
    );
}

export default Canvas;
