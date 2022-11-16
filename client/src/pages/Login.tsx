import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Form from '../components/Authentication/Form';
import './Login.css'

function Login(props: any) {

    const { element } = props;

    return (
        <main id='login'>
            {element}
            {/* <Link to="../home"><button className='landing-action__button'>Assuming successful login</button></Link> */}
        </main>

    )
}

export default Login;
