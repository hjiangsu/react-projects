import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import '../stylesheets/Login.css';
import login from '../images/login.png';

import { useAuth } from "../context/auth";
import { useUser } from '../context/usr.js';

function Login(props) {

  const { authStatus, setAuthStatus } = useAuth();
  const { setUserDetails } = useUser();

  // // useState Hooks to keep information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState({ status: false, error: '' });

  const errorStatus = errorMsg.status ? errorMsg.error : null;

  // Login will send details to server - server 
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
          setUserDetails(response.data.user);
        } else {
          setErrorMsg({ status: true, error: <p className="login-error-message">Error: {response.data.error}</p> });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // If already logged in, redirect to profile
  if (isLoggedIn || authStatus) {
    return <Redirect to='/profile' />;
  }

  return (
    <Fragment>
      <div className="login-root">
        <div className="login-container">
          <div className="login-app-info">
            <img src={login} alt='login' className='login-app-info-image' />
            <h2>Login to access user profile, game statistics, and start game sessions</h2>
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
              <input type="submit" value="Log In" />
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