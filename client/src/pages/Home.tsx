import React, { ChangeEvent } from 'react';
import Header from '../components/Header'
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
                                <h3>Image failed to load</h3>
                            )
                        }

                    })()}

                </section>
            </main>
        </>
    )
}

export default Home;
