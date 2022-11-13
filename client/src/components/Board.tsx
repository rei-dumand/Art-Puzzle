import './Board.css';
import React, { useEffect, useRef, useState } from 'react';

import Tile from './Tile'

import imgURL from '../img/1964.336 - Paris Street; Rainy Day.jpg'


function Board() {
    const [tiles, setTiles] = useState([...Array(500).keys()]);

    const image = new Image()
    image.src = imgURL

    const board = {
        width: image.width,
        height: image.height
    }

    const style = {
        width: board.width,
        height: board.height,
    };

    const pieceWidth = Math.round(board.width / 10);
    console.log(pieceWidth)
    const pieceHeight = pieceWidth
    // const pieceHeight = Math.round(board.height / 10);

    return (
        <>
            <ul style={style} className="board">
                {tiles.map((tile, index : number) => (
                    <Tile
                        image={image}
                        key={tile}
                        index={index}
                        // imgUrl={imgUrl}
                        tile={tile}
                        width={pieceWidth}
                        height={pieceHeight}
                        // handleTileClick={handleTileClick}
                    />
                ))}
            </ul>
        </>
    )
}

export default Board;