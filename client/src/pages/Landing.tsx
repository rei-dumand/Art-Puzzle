import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'
import Spline from '@splinetool/react-spline';

function Landing(props: any) {

    return (
        <main id='landing'>

            {/* <Spline scene="https://prod.spline.design/KBu3HABo4DflGhrU/scene.splinecode" /> */}
           {/* <Spline scene="https://prod.spline.design/bfz8SbA-9d49pjTm/scene.splinecode" /> */}


            <section id="spinner"></section>

            {/* <section id="landing-catchphrase">
                    Your Online Fine Arts Puzzles
                </section> */}

            {/* <h1 id='landing-page__title'>
                    Eazzle
                </h1>

                <section id='landing-action'>
                    <Link to="login"><button className='landing-action__button'>login</button></Link>
                    |
                    <Link to="signup"><button className='landing-action__button'>signup</button></Link>

                </section> */}
        </main>

    )
}

export default Landing;
