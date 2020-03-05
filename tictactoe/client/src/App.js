import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Header from './components/Header.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import Profile from './pages/Profile.js';
import Game from './pages/Game.js';
import Error from './pages/Error.js';

import { AuthContext } from './context/auth.js';
import { UserContext } from './context/usr.js';
import PrivateRoute from './PrivateRoute.js';

import './stylesheets/App.css';


// Main component focused on routing to other pages
function App(props) {

  const [authStatus, setAuthStatus] = useState(false);
  const [userDetails, setUserDetails] = useState(false);

  // Check authentication status when first loaded
  useEffect(() => {
    axios.get('/api/')
      .then((response) => {
        if (response.data.success) {
          console.log(response.data)
          setAuthStatus(true);
          setUserDetails(response.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // React-Router Paths
  return (
    <AuthContext.Provider value={{ authStatus, setAuthStatus }}>
      <UserContext.Provider value={{ userDetails, setUserDetails }}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
            <PrivateRoute path='/profile' component={Profile} />
            <PrivateRoute path='/game' component={Game} />
            <Route render={Error} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;