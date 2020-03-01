import React, {useState, useEffect} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import axios from 'axios';

import Login from './pages/Login.js';
import Homepage from './pages/Homepage.js';

import './stylesheets/App.css';

function App(props) {

    const [isAuthenticated, setAuthentication] = useState(false);
    const [userData, setUserData] = useState({ username: '', email: '', age: ''});
    const history = useHistory();
    const location = useLocation();
    
    // Check to see if current client is authenticated
    useEffect(() => {
        axios.get('/api/', {withCredentials: true})
        .then((res) => {
            console.log("checking status")
            if (res.data.user) {
                setUserData(res.data.user);
                setAuthentication(true);

                if (location.pathname === '/Login' || location.pathname === '/' || location.pathname === '/register') {
                    history.push('/home');
                }
                else {
                    history.push(location.pathname);
                }
            }
            else {
                history.replace('/login');
            }
        });
    }, []);

    // useEffect(() => {

    // }, []);
    
    console.log(location)

    if (isAuthenticated && location.pathname === '/home') {
        return <Homepage user={userData}/>;
    }
    else {
        return (
            <Login 
                updateAuthentication={() => {
                    setAuthentication(true);
                }}
            />
        );
    }
}

export default App;