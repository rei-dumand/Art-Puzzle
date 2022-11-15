import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'

function Login(props: any) {

    return (
        <main id='login'>
            <Link to="../home"><button className='landing-action__button'>Assuming successful login</button></Link>
        </main>

    )
}

export default Login;
