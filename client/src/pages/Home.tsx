import React, { ChangeEvent, useEffect } from 'react';
import Header from '../components/Header'
import { CircularProgress } from '@mui/material';
import './Home.css'
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { Artwork } from '../types'

type props = {
    heroImgID: string | null;
    artworkData: Artwork[] | null;
    arrImgID: string[] | null;
    heroImg: HTMLImageElement | null;
}

function Home(props: props) {
    let { heroImg, heroImgID } = props;

    useEffect(() => {
      
    }, [heroImg, heroImgID])
    

    const navigate = useNavigate()

    return (
        <>
            <Header />
            <main className='main'>
                <section id="home">
                    {(() => {
                        if (heroImg) {
                            return (
                                <img
                                    className='selected-image'
                                    src={heroImg.src}
                                    onClick={() => {
                                        navigate('/play', { state: { imgID: heroImgID } })
                                    }}
                                    alt=""
                                    onError={(e: ChangeEvent<HTMLImageElement>) => e.target.style.display = 'none'}
                                >
                                </img>
                            )
                        } else {
                            return (
                                <CircularProgress color="inherit" />
                                // <h3>Image failed to load</h3>
                            )
                        }

                    })()}

                </section>
            </main>
        </>
    )
}

export default Home;
