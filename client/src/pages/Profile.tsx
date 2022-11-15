import React from 'react';
import {Link} from 'react-router-dom';

function Profile(props: any) {

    return (
        <>
        This is the profile page
        <Link to="home">Click here to go to home page</Link>
        </>
    )
}

export default Profile;
