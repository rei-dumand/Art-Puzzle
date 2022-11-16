import React, { ChangeEvent } from 'react';
import Header from '../components/Header';
import './Profile.css';
import {
    auth,
} from "../../src/firebase-config";

type props = {
    username: string
    arrImgID: string[] | null;

}

function Profile(props: props) {
    const { username, arrImgID } = props;

    return (
        <>
            <Header />
            <main className='main'>
                <section id="profile">
                    <p id='profile__welcome'>
                        Hi {username ? username : "user"}, welcome to your personal space.
                    </p>
                    <div className='profile__images-container'>

                        {(() => {
                            if (arrImgID) {
                                return (
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${arrImgID[5]}/full/1000,/0/default.jpg`}
                                        alt=""
                                    ></img>
                                )
                            }
                        })()}
                        {(() => {
                            if (arrImgID) {
                                return (
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${arrImgID[6]}/full/800,/0/default.jpg`}
                                        alt=""
                                    ></img>
                                )
                            }
                        })()}
                        {(() => {
                            if (arrImgID) {
                                return (
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${arrImgID[60]}/full/1000,/0/default.jpg`}
                                        alt=""
                                    ></img>
                                )
                            }
                        })()}
                    </div>

                </section>
            </main>
        </>
    )
}

export default Profile;
