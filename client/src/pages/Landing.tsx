import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

function Landing(props: any) {

    return (
        <main id='landing'>
            	
                <section id="landing-catchphrase">
                    Your Online Fine Arts Puzzles
                </section>

                <h1 id='landing-page__title'>
                    Ozzler
                </h1>

                <section id='landing-action'>
                    <Link to="login"><button className='landing-action__button'>login</button></Link>
                    |
                    <Link to="signup"><button className='landing-action__button'>signup</button></Link>

                </section>
        </main>

    )
}

export default Landing;
