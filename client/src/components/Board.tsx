import './Board.css';
import React, { useState, useEffect, useRef } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {

    interface Board {
        width: number
        height: number
    }

    let [tiles, setTiles] = useState<number[] | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    let tileWidth = useRef<number | null>(null)
    let tileHeight = useRef<number | null>(null)
    let colDiv = useRef<number | null>(null);
    let rowDiv = useRef<number | null>(null);
    let board = useRef<Board | null>(null);
    let style = useRef<Object | undefined>(undefined);

    function loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    function shuffle(arr : number[]) {

        const shuffledArr = [
            ...arr.sort(() => Math.random() - 0.5),
        ];
        console.log(shuffledArr)
        return shuffledArr
    }

    useEffect(() => {
        let img;
        const fetchImage = async () => {
            img = await loadImage(imgURL)
            setImage(img)
        }
        fetchImage()
            .catch(console.error)
    }, [])

    useEffect(() => {
        function setup() {
            board.current = {
                width: image!.width,
                height: image!.height
            }

            const aspectRatio = board.current.width / board.current.height;

            style.current = ({
                width: board.current.width,
                height: board.current.height,
            });

            let userSetDiv = 10 // This value should be changed by the user using difficulties.
            rowDiv.current = userSetDiv;
            colDiv.current = Math.round(userSetDiv / aspectRatio);

            let tileCount = rowDiv.current! * colDiv.current!
            tileWidth.current = (board.current.width / rowDiv.current!);
            tileHeight.current = (board.current.height / colDiv.current!);

            setTiles(shuffle([...Array(tileCount).keys()]))
        }

        if (image) {
            console.log("image has loaded: ", image)
            setup();
        }
    }, [image])

    
    function handleTileClick(e: any) {
        console.log(e.target.id)
    }


    if (tiles !== null
        && tileWidth.current !== null
        && tileHeight.current !== null
        && rowDiv.current !== null
        && colDiv.current !== null
        && style.current !== undefined
        && board.current !== undefined) {
        return (
            <>
                <ul style={style.current} className="board">
                    {tiles!.map((tile, index: number) => (
                        <Tile
                            board={board}
                            key={index}
                            rowDiv={rowDiv.current}
                            colDiv={colDiv.current}
                            image={image}
                            index={index}
                            tile={tile}
                            tileWidth={tileWidth.current}
                            tileHeight={tileHeight.current}
                            handleTileClick={handleTileClick}
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