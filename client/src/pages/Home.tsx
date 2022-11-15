import React, { ChangeEvent } from 'react';
import Header from '../components/Header'
import './Home.css'
// import axios from 'axios';
import { Artwork } from '../types'

type props = {
    artworkData : Artwork[] | null;
    arrImgID : string[] | null;
}

function Home(props: props) {
    let {arrImgID} = props;

    return (
        <>
            <Header />
            <main id='home'>
                {(() => {
                    if (arrImgID) {
                        return arrImgID!.map((imgID, index: number) => (
                            <img
                                src={`https://www.artic.edu/iiif/2/${imgID}/full/200,/0/default.jpg`}
                                onError={(e: ChangeEvent<HTMLImageElement>) => e.target.style.display = 'none'}
                                key={index}
                                alt=""
                            ></img>
                        ))
                    } else {
                        return <></>
                    }
                })()}

                {/* <Board /> */}
            </main>
        </>
    )
}

export default Home;
