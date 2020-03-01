import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import axios from 'axios';

import Login from './pages/Login.js';
import Homepage from './pages/Homepage.js';
import Game from './pages/Game.js';
import Error from'./pages/Error.js';

import './stylesheets/App.css';
import Register from './pages/Register.js';

function App(props) {

    const [isAuthenticated, setAuthentication] = useState(false);
    const [userData, setUserData] = useState({ username: '', email: '', age: ''});
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        if (location.pathname === '/Login') {
            history.replace('/login');
        }
    });

    // Check to see if current client is authenticated
    useEffect(() => {
        axios.get('/api/', {withCredentials: true})
        .then((res) => {
            console.log("checking status")
            if (res.data.user) {
                setUserData(res.data.user);
                setAuthentication(true);

                if (location.pathname === '/login' || location.pathname === '/' || location.pathname === '/register') {
                    history.push('/profile');
                }
                else {
                    history.push(location.pathname);
                }
            }
        });
    }, []);

    if (isAuthenticated && location.pathname === '/profile') {
        return (
            <Homepage 
                user={userData} 
                updateAuthentication={() => {
                    setAuthentication(false);
                    history.push('/');
                }}
            />
        );
    }
    else if (isAuthenticated && location.pathname === '/game') {
        return <Game />
    }
    else if (!isAuthenticated && location.pathname === '/register') {
        return <Register />
    }
    else if (!isAuthenticated && (location.pathname === '/'  || location.pathname === '/login')) {
        return (
            <Login 
                updateAuthentication={() => {
                    setAuthentication(true);
                    history.push('/profile');
                }}
            />
        );
    }
    else {
        return <Error />
    }
}

export default App;