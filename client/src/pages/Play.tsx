import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import './Explore.css';
import Board from '../components/Board'
import { useLocation } from 'react-router-dom';
import './Play.css';
import { auth } from '../firebase-config'
import api from '../services/axiosconfig'

function Play() {

    const location = useLocation();

    let imgID = useRef<string | null>(location.state.imgID)
    let [imgURL, setImageURL] = useState<string | null>(null);

    useEffect(() => {
        if (imgID) {
            setImageURL(`https://www.artic.edu/iiif/2/${imgID.current}/full/800,/0/default.jpg`)
        }
    }, [imgID])


    return (
        <main className='main'>
            <Header />
            <section id="play">
                {(() => {
                    if (imgURL) {
                        return (
                            <Board
                                imgURL={imgURL}
                                imgID={imgID.current}
                            />
                        )
                    }
                })()}

            </section>
        </main>
    )
}

export default Play