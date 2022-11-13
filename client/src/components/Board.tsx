import './Board.css';
import React, { useEffect, useRef, useState } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {
    
    const image = new Image()
    image.src = imgURL
    
    const board = {
        width: image.width,
        height: image.height
    }
    
    const aspectRatio = board.width / board.height;
    
    // console.log(aspectRatio)
    
    const style = {
        width: board.width,
        height: board.height,
    };

    const rowDiv = 30
    const colDiv = Math.round(rowDiv / aspectRatio)
    const tileCount = rowDiv * colDiv
    console.log(tileCount)
    
    const tileWidth = board.width / rowDiv;
    const tileHeight = board.height / colDiv;
    // const pieceHeight = Math.round(board.height / 10);
    
    const [tiles, setTiles] = useState([...Array(tileCount).keys()]);

    return (
        <>
            <ul style={style} className="board">
                {tiles.map((tile, index : number) => (
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

export default Board;