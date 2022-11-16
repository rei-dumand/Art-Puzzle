import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Profile.css';
import {
    auth,
} from "../../src/firebase-config";


function Profile(props: any) {

    if (auth.currentUser) console.log(auth.currentUser.email)
    return (
        <>
            <Header />
            <main className='main'>
                <section id="profile">
                    This is the profile page
                    <Link to="../home">Click here to go to home page</Link>
                </section>
            </main>
        </>
    )
}

export default Profile;
