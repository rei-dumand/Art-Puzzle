import './Board.css';
import React, { useState, useEffect, useRef } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {

    let [tiles, setTiles] = useState<number[] | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [fire, setFire] = useState<boolean>(false);

    let tileWidth = useRef<number | null>(null)
    let tileHeight = useRef<number | null>(null)
    let colDiv = useRef<number | null>(null);
    let rowDiv = useRef<number | null>(null);
    let style = useRef<Object | undefined>(undefined);
    
    // let tileCount = useRef<number | null>(null);


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
            console.log(board)

            const aspectRatio = board.width / board.height;

            style.current = ({
                width: board.width,
                height: board.height,
            });

            console.log("aspect ratio: ",aspectRatio)
            let userSetDiv = 10 // This value should be changed by the user using difficulties.
            rowDiv.current = userSetDiv;
            colDiv.current = Math.round(userSetDiv / aspectRatio);



            let tileCount = rowDiv.current! * colDiv.current!

            console.log(rowDiv)
            console.log(colDiv)
            tileWidth.current = (board.width / rowDiv.current!);
            tileHeight.current = (board.height / colDiv.current!);

            setTiles([...Array(tileCount).keys()])
            setFire(true)
        
        }

        if (image) {
            console.log("image has loaded: ", image)
            setup();
        }
    }, [image])

    useEffect(() => {
        if (fire) {
            console.log(rowDiv)
            console.log(colDiv)
            console.log("has fired")
        }
    }, [fire])

    console.log(tiles)
    // console.log(tileWidth.current)
    // console.log(tileHeight.current)
    // console.log(rowDiv.current)
    // console.log(colDiv.current)

    if (tiles !== null
        && tileWidth.current !== null
        && tileHeight.current !== null
        && rowDiv.current !== null
        && colDiv.current !== null
        && style.current !== undefined) {
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
            </>
        )
    }
    else {
        return null
    }
}

export default Board;