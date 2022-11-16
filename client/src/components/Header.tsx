import React from 'react';
import './Header.css'
import { Link } from 'react-router-dom'
import { logout } from '../firebase-config'

function Header() {

    return (

        <section id='header'>
            <div id='header__container'>
                <Link to="/home" id='header__logo'><h1>Oz</h1></Link>
                <nav className='header__nav'>
                    <ul>
                        <li className='header__nav-item'><Link to="/explore">Explore</Link></li>
                        <li className='header__nav-item'><Link to="/profile">Profile</Link></li>
                        <li className='header__nav-item' onClick={logout}><Link to="/">Sign Out</Link></li>
                    </ul>
                </nav>
            </div>
        </section>
    )

}

export default Header;