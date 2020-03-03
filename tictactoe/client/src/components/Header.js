import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import '../stylesheets/Header.css';
import logo from '../images/logo.png';

import { useAuth } from "../context/auth";

function Header(props) {

    const { authStatus, setAuthStatus } = useAuth();
    const history = useHistory();

    const logOut = ()  => {
        axios.get('/api/logout', {withCredentials: true})
        .then((res) => {
            setAuthStatus();
        });
    }

    const goHome = () => {
        history.replace('/');
    }

    return (
        <div className="header-root">
            <div className="header-left" onClick={goHome}>
                <img src={logo} alt="Logo" id="header-logo"/>
                <h1>Tic-Tac-Toe</h1>
            </div>
            <div className="header-right">
            {
            authStatus ?
            (
                <>
                    <Link className='header-link' to='/profile'>Profile</Link>
                    <button className='header-button' onClick={logOut}>Log Out</button>
                </>
            ) : (
                <>
                    <Link className='header-link' to='/login'>Login</Link>
                    <Link className='header-link' to='/register'>Register</Link>
                </>
            )
            }      
            </div>
        </div>
    );
}

export default Header;