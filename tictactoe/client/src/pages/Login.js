import React, {useState, useEffect, Fragment} from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

import '../stylesheets/Login.css';
import logo from '../images/logo.png';

// import Homepage from './Homepage.js';
import { useAuth } from "../context/auth";

function Login(props) {

    const { authStatus, setAuthStatus } = useAuth();

    // // useState Hooks to keep information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState({status: false, error: ''});
    
    const errorStatus = errorMsg.status ? errorMsg.error : null;

    function postLogin(e) {
        e.preventDefault();

        axios.post('/api/login', {
            username: username,
            password: password,
            
        })
        .then((response) => {
            if (response.data.success) {
                setAuthStatus(true);
                setLoggedIn(true);
            }
            else {
                setErrorMsg({status: true, error: <p className="login-error-message">Error: {response.data.error}</p>});
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if (isLoggedIn || authStatus) {
        return <Redirect to='/profile' />;
    }

    return (
            <Fragment>
                            <div className="login-root">
                            <div className="login-container">
                                <div className="login-app-info">
                                    <div className="login-app-info-logo-container">
                                        <img 
                                            src={logo}alt="Logo" 
                                            id="login-app-info-logo"
                                            />
                                    </div>
                                    <h1>Tic-Tac-Toe</h1>
                                    <h3>
                                        A multiplayer Tic-Tac-Toe application using React.js, Express.js, MongoDB, and Socket.io.
                                    </h3>
                                    <div className="login-app-info-links">
                                        {/* add github link, linkedin, portfolio */}
                                    </div>
                                </div>
                                <div className="login-input">
                                    <h1>Login</h1>
                                    <form className="login-form" onSubmit={postLogin}>
                                        <input 
                                            type="text" 
                                            name="username" 
                                            placeholder="Username" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            />
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="Password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            />
                                        <input type="submit" value="Log In"/>
                                    </form>
                                    <div className="login-error">
                                        {errorStatus}
                                    </div>
                                </div>
                            </div>
                        </div>

        </Fragment>

    );
    
}

export default Login;