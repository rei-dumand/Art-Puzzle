import React, { useState } from 'react';
import { start } from 'repl';

import './Tile.css';

function Tile(props: any) {
    let {
        board,
        rowDiv,
        colDiv,
        tile,
        index,
        tileWidth,
        tileHeight,
        image,
        handleTileClick,
        activeTileID,
        // setActiveTileID,
        startTileID
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
                id={index}
                onClick={(e) => {
                    if (startTileID !== tile) {
                        activeTileID.current = tile
                        handleTileClick(e);
                        // console.log(activeTileID.current)
                        // !activeTileID ? activeTileID.current = tile : activeTileID.current = null
                    }
                }}
                style={{
                    ...tileStyle,
                    transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                    // borderRadius: 20,
                    color: "white"
                }}
                className={(() => {
                    // console.log(startTileID, " && " , tile)
                    if (startTileID === tile) {
                        return "tile tile-start"
                    }
                    if (activeTileID.current === tile) {
                        return "tile tile-selected"
                    } else {
                        return "tile"
                    }
                })()}
            >
                tile: {tile} <br></br> index: {index}
            </li>

            {/* {(() => {
                if (startTileID === tile) {
                    return (
                        <div
                            style={{
                                width: `calc(100% / ${rowDiv})`,
                                height: `calc(100% / ${colDiv})`,
                                position: 'absolute',
                                transform: `translate3d(${tileStyle.translateX}px, ${tileStyle.translateY}px, 0)`,
                            }}
                            className="tile-start"
                        ></div>
                    )
                }
            })()} */}
        </>
    );
}



export default Tile;