import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

function Signup(props: any) {

    return (
        <main id='login'>
                
                    <Link to="../home"><button className='landing-action__button'>Assuming successful signup</button></Link>

        </main>

    )
}

export default Signup;