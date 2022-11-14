import React from 'react';

import './Tile.css';

function Tile(props: any) {
    const {
        board,
        rowDiv,
        colDiv,
        tile,
        index,
        tileWidth,
        tileHeight,
        image,
        handleTileClick 
    } = props;


    function getMatrixPosition(index: number) {
        return {
            row: Math.floor(index / rowDiv),
            col: index % rowDiv,
        };
    }

    function getVisualPosition(row: number, col: number, width: number, height: number) {
        return {
            x: col * width,
            y: row * height,
        };
    }
    const { row, col } = getMatrixPosition(index);

    const visualPos = getVisualPosition(row, col, tileWidth, tileHeight);

    const tileStyle = {
        width: `calc(100% / ${rowDiv})`,
        height: `calc(100% / ${colDiv})`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage: `url(${image.src})`,
        backgroundSize: `${board.current.width}px ${board.current.height}px`,
        backgroundPosition: `${(100 / (rowDiv - 1)) * (tile % rowDiv)}% ${(100 / (colDiv - 1)) * (Math.floor(tile / rowDiv))}%`,
    };

    return (
        <>
            <li
                id={tile}
                onClick={handleTileClick}
                style={{
                    ...tileStyle,
                    transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                    // borderRadius: 20,
                    color: "white"
                }}
                className="tile"
            >
                {tile}
            </li>
            {/* <>Hello</> */}
        </>
    );
}



export default Tile;