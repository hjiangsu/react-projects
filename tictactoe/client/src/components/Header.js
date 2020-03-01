import React from 'react';
import axios from 'axios';

import '../stylesheets/Header.css';
import logo from '../images/logo.png';

function Header(props) {
    var button;

    const logOutSequence = () => {

    }

    const gotoRegister = () => {
        
    }

    const gotoLogin = () => {

    }
    // const login = () => {
    //     props.onLogin();
    // }

    // const logout = () => {
    //     axios.get('/api/logout', {
    //         withCredentials: true
    //     })
    //     .then((res) => {
    //         console.log(res);
    //     })
        
    //     props.logout();
    // }

    // const register = () => {
    //     props.onRegister();
    // }

    console.log(props.page)

    if (props.page === 'home') {
        button = <button className="header-button" onClick={logOutSequence}>Log Out</button>
    }
    else if (props.page === 'login') {
        button = <button className="header-button"  onClick={gotoRegister}>Register</button>
    }
    else if (props.page === 'register') {
        button = <button className="header-button"  onClick={gotoLogin}>Log In</button>
    }

    return (
        <div className="header-root">
            <div className="header-left">
                <img src={logo} alt="Logo" id="header-logo"/>
                <h1>Tic-Tac-Toe</h1>
            </div>
            <div className="header-right">
                {button}
            </div>
        </div>
    );
}

export default Header;