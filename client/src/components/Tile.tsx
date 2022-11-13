import React from 'react';

import './Tile.css';

function Tile(props: any) {
    const { rowDiv, colDiv, tile, index, tileWidth, tileHeight, image } = props;

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
        backgroundSize: `${600}px`,
        backgroundPosition: `${(100 / (rowDiv - 1)) * (tile % rowDiv)}% ${(100 / (rowDiv - 1)) * (Math.floor(tile / rowDiv))}%`,
    };
  
    return (
        <>
            <li
                style={{
                    ...tileStyle,
                    transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                    borderRadius: 20
                }}
                className="tile"
            >
                {/* {!imgUrl && `${tile + 1}`} */}
            </li>
            {/* <>Hello</> */}
        </>
    );
}



export default Tile;