import React, { ChangeEvent } from 'react';
import Header from '../components/Header';
import './Explore.css';
import { Artwork } from '../types'


type props = {
    artworkData: Artwork[] | null;
    arrImgID: string[] | null;
}

function Explore(props: props) {
    const { artworkData, arrImgID } = props;
    // console.log(artworkData)

    return (
        <>
            <Header />
            <main className='main'>
                <section id='explore'>
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
                </section>
            </main>
        </>
    )
}

export default Explore