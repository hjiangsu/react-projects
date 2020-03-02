import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../stylesheets/Header.css';
import logo from '../images/logo.png';

import { useAuth } from "../context/auth";

function Header(props) {

    const { authStatus, setAuthStatus } = useAuth();


    function logOut() {
        axios.get('/api/logout', {withCredentials: true})
        .then((res) => {
            setAuthStatus();
        });
    }

    //var button;
    
    //const history = useHistory();

    const logOutSequence = () => {
        axios.get('/api/logout', {
            withCredentials: true
        })
        .then((res) => {
            //console.log(res);
            props.logout();
        });
    }

    // const gotoRegister = () => {
    //     history.push('/register');
    // }

    // const gotoLogin = () => {
    //     history.push('/login');
    // }


    // if (props.page === 'home') {
    //     button = <button className="header-button" onClick={logOutSequence}>Log Out</button>
    // }
    // else if (props.page === 'login') {
    //     button = <button className="header-button"  onClick={gotoRegister}>Register</button>
    // }
    // else if (props.page === 'register') {
    //     button = <button className="header-button"  onClick={gotoLogin}>Log In</button>
    // }


    return (
        <div className="header-root">
            <div className="header-left">
                <img src={logo} alt="Logo" id="header-logo"/>
                <h1>Tic-Tac-Toe</h1>
            </div>
            <div className="header-right">
            {
            authStatus ?
            (
                <button onClick={logOut}>Log Out</button>
            ) : (
                <>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>
            )
            }      
            </div>
        </div>
    );
}

export default Header;