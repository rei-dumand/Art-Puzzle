import React from 'react';

import './Tile.css';

function Tile(props: any) {
    const { tile, index, width, height, handleTileClick, image} = props;

    const GRID_SIZE: number = 10;

    
    function getMatrixPosition(index: number) {
        return {
            row: Math.floor(index / GRID_SIZE),
            col: index % GRID_SIZE,
        };
    }

    function getVisualPosition(row: number, col: number, width: number, height: number) {
        return {
            x: col * width,
            y: row * height,
        };
    }
    const { row, col } = getMatrixPosition(index);
    const visualPos = getVisualPosition(row, col, width, height);
    const tileStyle = {
        width: `calc(100% / ${GRID_SIZE})`,
        height: `calc(100% / ${GRID_SIZE})`,
        translateX: visualPos.x,
        translateY: visualPos.y,
        backgroundImage: `url(${image.src})`,
        backgroundSize: `${600}px`,
        backgroundPosition: `${(100 / (GRID_SIZE - 1)) * (tile % GRID_SIZE)}% ${(100 / (GRID_SIZE - 1)) * (Math.floor(tile / GRID_SIZE))}%`,
    };

    return (
        <li
            style={{
                ...tileStyle,
                // backgroundColor: "blue",
                transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                borderRadius: 20
            }}
            className="tile"
        >
            {/* {!imgUrl && `${tile + 1}`} */}
        </li>
    );
}



export default Tile;