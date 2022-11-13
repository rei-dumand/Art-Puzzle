import './Board.css';
import React, { useState } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {
    
    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        })
        ;
    }
    
    let style;
    let colDiv : number,
        rowDiv : number, 
        image : HTMLImageElement, 
        tileWidth : number, 
        tileHeight : number;
    
    
    const [tiles, setTiles] = useState<number[] | null>(null);

    async function setup() {
        const image: HTMLImageElement = await loadImage(imgURL).then(image => image);
        image.src = imgURL

        const board = {
            width: image.width,
            height: image.height
        }

        const aspectRatio = board.width / board.height;

        console.log(aspectRatio)

        style = {
            width: board.width,
            height: board.height,
        };

        rowDiv = 30
        colDiv = Math.round(rowDiv / aspectRatio)
        const tileCount = rowDiv * colDiv
        console.log(tileCount)

        tileWidth = board.width / rowDiv;
        tileHeight = board.height / colDiv;
        // const pieceHeight = Math.round(board.height / 10);

        setTiles([...Array(tileCount).keys()]);
    }

    setup();

    if (tiles !== null) {
        return (
            <>
                <ul style={style} className="board">
                    {tiles!.map((tile, index: number) => (
                        <Tile
                            rowDiv={rowDiv}
                            colDiv={colDiv}
                            image={image}
                            index={index}
                            tile={tile}
                            tileWidth={tileWidth}
                            tileHeight={tileHeight}
    
                        />
                    ))}
                </ul>
            </>
        )
    }
    else {
        return null
    }
}

export default Board;