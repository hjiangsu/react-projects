import React from 'react';
import './Header.css';

function Header(props) {
    var button;

    const login = () => {
        props.onLogin();
    }

    const logout = () => {
        props.logout();
    }

    const register = () => {
        props.onRegister();
    }

    if (props.loginStatus) {
        button = <button onClick={logout}>Log Out</button>
    }
    else if (!props.loginStatus && !props.registerStatus) {
        button = <button onClick={register}>Register</button>
    }
    else if (!props.loginStatus && props.registerStatus) {
        button = <button onClick={login}>Log In</button>
    }

    return (
        <div className="header-root">
            <div className="header-left">

            </div>
            <div className="header-right">
                {button}
            </div>
        </div>
    );
}

export default Header;