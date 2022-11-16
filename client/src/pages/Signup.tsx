import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css'
import Form from '../components/Authentication/Form';
import './Signup.css';

function Signup(props: any) {

    const { element } = props;

    return (
        <main id='signup'>
            {element}

            {/* <Link to="../home"><button className='landing-action__button'>Assuming successful signup</button></Link> */}

        </main>

    )
}

export default Signup;