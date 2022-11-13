import './Board.css';
import React, { useState, useEffect } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {

    
    const [tiles, setTiles] = useState<number[] | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [tileWidth, setTileWidth] = useState<number | null>(null);
    const [tileHeight, setTileHeight] = useState<number | null>(null);
    const [colDiv, setColDiv] = useState<number | null>(null);
    const [rowDiv, setRowDiv] = useState<number | null>(null);
    const [style, setStyle] = useState<Object | undefined>(undefined);

    
    useEffect(()=> {

        const loadImage = (src: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        }
        
        async function setup() {
            setImage(await loadImage(imgURL).then(image => image));
            image!.src = imgURL
    
            const board = {
                width: image!.width,
                height: image!.height
            }
    
            const aspectRatio = board.width / board.height;
    
            console.log(aspectRatio)
    
            setStyle({
                width: board.width,
                height: board.height,
            });
    
            setRowDiv(30)
            setColDiv(Math.round(rowDiv! / aspectRatio))
            const tileCount = rowDiv! * colDiv!
            console.log(tileCount)
    
            setTileWidth(board.width / rowDiv!);
            setTileHeight(board.height / colDiv!);
            // const pieceHeight = Math.round(board.height / 10);
    
            setTiles([...Array(tileCount).keys()]);
        }

        setup();
    },[tiles, colDiv, rowDiv, image])

    if (tiles !== null && tiles !== undefined && image !== undefined) {
        return (
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
        )
    }
    else {
        return null
    }
}

export default Board;