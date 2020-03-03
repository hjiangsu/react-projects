import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth.js';

function Home(props) {

    const { authStatus } = useAuth();

    if (authStatus) {
        return <Redirect to='/profile' />
    }
    else {
        return (
            <div className=''>
                
            </div>
    
        );
    }
}

export default Home;