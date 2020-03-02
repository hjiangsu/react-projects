import React from 'react';

import { useAuth } from '../context/auth.js';
import { Route, Redirect } from 'react-router-dom';

function Home(props) {

    const { authStatus } = useAuth();

    if (authStatus) {
        return <Redirect to='/profile' />
    }

    return (
        <div>
            Home
        </div>

    );
}

export default Home;