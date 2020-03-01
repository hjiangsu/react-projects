import React, {useState, useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import axios from 'axios';

import Register from './pages/Register';
import Login from './pages/Login.js';
import Homepage from './pages/Homepage.js';

import './stylesheets/App.css';

function App(props) {

    const [isAuthenticated, setAuthentication] = useState(false);
    const [userData, setUserData] = useState({ username: '', email: '', age: ''});
    
    // Check to see if current client is authenticated
    useEffect(() => {
        axios.get('/api/', {withCredentials: true})
        .then((res) => {
            if (res.data.user) {
                setUserData(res.data.user);
                setAuthentication(true);
            }
        });
    }, []);

    return (
        <Switch>
            <Route path='/register'>
                <Register />
            </Route>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/' render={(routerProps) => {
                console.log(routerProps)
                if (isAuthenticated) {
                    return <Homepage user={userData}/>
                }
                else {
                    return <Redirect to={{ pathname: '/login' }} />
                }
            }} />
        </Switch>
    );
}

export default App;