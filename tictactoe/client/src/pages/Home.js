import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../context/auth.js';

import logo from '../images/logo-home.png';
import github from '../images/github.png';
import linkedin from '../images/linkedin.png';
import portfolio from '../images/portfolio.png';

import '../stylesheets/Home.css';

function Home(props) {

    const { authStatus } = useAuth();

    // If authenticated, re-route user to their profile
    if (authStatus) {
        return <Redirect to='/profile' />
    }
    else {
        return (
            <div className='home-root'>
                <div className='home-container'>
                    <div className='home-logo'>
                        <img className='home-logo-img' src={logo} alt='logo'/>
                    </div>
                    <div className='home-description'>
                        <h2> Welcome to Tic-Tac-Toe </h2>
                        <h3>Multiplayer Edition</h3>
                    </div>
                    <div className='home-links'>
                        <a href="http://www.sfu.ca/~hjiangsu">
                            <img className='home-links-img' src={portfolio} alt='portfolio'/>
                        </a>
                        <a href="https://github.com/hjiangsu">
                            <img className='home-links-img' src={github} alt='github'/>
                        </a>
                        <a href="https://linkedin.com/in/hjiangsu">
                            <img className='home-links-img' src={linkedin} alt='linkedin'/>
                        </a>
                    </div>
                    <div className='home-resources'>
                        <h4>Made with React.js, Express.js, MongoDB, and Socket.io</h4>
                    </div>
                </div>
            </div>
    
        );
    }
}

export default Home;