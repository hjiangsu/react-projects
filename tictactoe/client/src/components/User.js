import React from 'react';

import { useUser } from '../context/usr.js';

import '../stylesheets/User.css';
import avatar from '../images/avatar.png';

function User(props) {

  const { userDetails } = useUser();
  console.log(userDetails)

  if (userDetails) {
    return (
      <div className="user-root">
        <div className="user-avatar">
          <img className='user-avatar-img' src={avatar} alt='avatar'/>
          <div className="user-username">
            <h1>{userDetails.username}</h1>
          </div>
        </div>
        <div className="user-info">
          <div className="user-email">
            <h1>Email: {userDetails.email} </h1>
          </div>
          <div className="user-age">
            <h1>Age: {userDetails.age}</h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (<div>Loading</div>);
  }
}


export default User;