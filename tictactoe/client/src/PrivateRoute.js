import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from './context/auth';

function PrivateRoute({ component: Component, ...rest }) {

  const { authStatus } = useAuth();
  
  console.log(authStatus);
  return(
    <Route 
      {...rest} 
      render={(props) => (
        authStatus ? 
        (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
    )}
    />
  );
}

export default PrivateRoute;