import './Board.css';
import React, { useState, useEffect, useRef } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {


    let [tiles, setTiles] = useState<number[] | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
   
    let tileWidth = useRef<number | null>(null)
    let tileHeight = useRef<number | null>(null)
    let colDiv = useRef<number | null>(null);
    let rowDiv = useRef<number | null>(null);
    let style = useRef<Object | undefined>(undefined);
    let tileCount: number;

    // const loadImage = (src: string): Promise<HTMLImageElement> => {
    //     return new Promise((resolve, reject) => {
    //         const img = new Image();
    //         img.onload = () => resolve(img);
    //         img.onerror = reject;
    //         img.src = src;
    //     });
    // }

    // setImage(await loadImage(imgURL).then(image => image));
    

    useEffect(() => {
        let img = new Image();
        img.src = imgURL
        setImage(img)
    }, [])

    useEffect(() => {
        function setup() {

            const board = {
                width: image!.width,
                height: image!.height
            }
    
            const aspectRatio = board.width / board.height;
    
            style.current = ({
                width: board.width,
                height: board.height,
            });
    
            rowDiv.current = 10;
            colDiv.current = Math.round(rowDiv.current! / aspectRatio)
            tileCount = rowDiv.current! * colDiv.current!
        
            tileWidth.current = (board.width / rowDiv.current!);
            tileHeight.current = (board.height / colDiv.current!);
            setTiles([...Array(tileCount).keys()])
        }
    


        if (image) {
            console.log("image has loaded: ", image)
            setup();
        }
    }, [image])

    // console.log(tiles)
    // console.log(tileWidth.current)
    // console.log(tileHeight.current)
    // console.log(rowDiv.current)
    // console.log(colDiv.current)

    if (tiles !== null && tileWidth.current !== null && tileHeight.current !== null && rowDiv.current !== null && colDiv.current !== null) {
        return (
            <>
                <ul style={style.current} className="board">
                    {tiles!.map((tile, index: number) => (
                        <Tile
                            key={index}
                            rowDiv={rowDiv.current}
                            colDiv={colDiv.current}
                            image={image}
                            index={index}
                            tile={tile}
                            tileWidth={tileWidth.current}
                            tileHeight={tileHeight.current}
                        />
                    ))}
                </ul>
                {/* <img src={image!.src} alt="" /> */}
            </>
        )
    }
    else {
        return null
    }
}

export default Board;