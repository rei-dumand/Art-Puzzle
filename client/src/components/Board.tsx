import './Board.css';
import React, { useState, useEffect, useRef } from 'react';
import api from '../services/axiosconfig'

import Tile from './Tile'

import { shuffle } from './Helpers'
import { auth } from '../firebase-config'

type props = {
    imgURL: string;
    imgID: string | null;
}

function Board(props: props) {
    const { imgURL, imgID } = props

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
    let startTileID = useRef<number | null>(null)

    const [sourceTile, setSourceTile] = useState<number | null>(null)

    let activeTileID = useRef<number | null>(null);

    function loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    // Image should always be defined on load.
    useEffect(() => {
        let img;
        const fetchImage = async () => {
            img = await loadImage(imgURL)
            console.log(img)
            setImage(img)
        }
        fetchImage()
            .catch(console.error)
    }, [imgURL])

    // Creates Initial Puzzle Grid
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

            let userSetDiv = 5 // This value should be changed by the user using difficulties.
            rowDiv.current = userSetDiv;
            colDiv.current = Math.round(userSetDiv / aspectRatio);

            let tileCount = rowDiv.current! * colDiv.current!
            tileWidth.current = (board.current.width / rowDiv.current!);
            tileHeight.current = (board.current.height / colDiv.current!);

            setTiles(shuffle([...Array(tileCount).keys()], startTileID))
        }

        if (image) {
            // console.log("image has loaded: ", image)
            setup();
        }
    }, [image])

    
    useEffect(() => {
        const createGameInstance = () => {
            if (auth.currentUser && imgURL) {
                console.log(auth.currentUser.uid)
                console.log(imgID)
                api.post('/newgame', {"uId": auth.currentUser.uid, "imageID": imgID, "gridState": tiles})
                .then(function (response) {
                    console.log(response)
                    return response.data
                })
                .catch(function (error) {
                    console.error(error);
                    return null
                });
            }
        }
       createGameInstance();
    }, [activeTileID])


    function handleTileClick(e: any) {
        const tileClickIndex = e.target.id;
        if (sourceTile === null) {
            setSourceTile(tileClickIndex)
        } else {
            swapTiles(tileClickIndex)
            setSourceTile(null)
            if (activeTileID.current !== null) {
                activeTileID.current = null
            }
        }
    }

    const swapTiles = (tileIndex: number) => {
        const swappedTiles = swap(tiles!, tileIndex, sourceTile!)
        setTiles(swappedTiles)
    }

    function swap(tiles: number[], src: number, dest: number) {
        const tilesResult = [...tiles];
        [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
        return tilesResult;
    }

    console.log(auth)

    useEffect(() => {
        function hasWon(tiles: number[]) {
            if (tiles) {
                for (let i = 0; i < tiles.length; i++) {
                    if (i !== tiles[i]) return
                }
                if (auth.currentUser) {
                    api.post('/endgame', {uId: auth.currentUser.uid, imageID: image})
                }
                return console.log("nice one") // Plug a request to save this instance of game as a success

            }
        }
        if (tiles) hasWon(tiles)
    }, [tiles, image])

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
                            activeTileID={activeTileID}
                            startTileID={startTileID.current}
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