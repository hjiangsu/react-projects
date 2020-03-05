import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import User from '../components/User.js';
import Statistics from '../components/Statistics.js';

import '../stylesheets/Profile.css';

function Homepage(props) {

  // TODO: Call server to retrieve statistics and place it into userStats hook
  // Create effect hook that grabs the user information and statistics based on the userid
  // const [userStats, setUserStats] = useState("");

  return (
    <Fragment>
      <div className="profile-root">
        <div className="profile-container">
          <div className="profile-left">
            <User />
            <div className="profile-game">
              <Link className='profile-link' to='/game'>Start Game</Link>
            </div>
          </div>
          <div className="profile-right">
            <Statistics />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Homepage;