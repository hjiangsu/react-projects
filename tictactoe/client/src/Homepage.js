import React, { useState } from 'react';
import Profile from './Profile.js';
import Statistics from './Statistics.js';

function Homepage(props) {

    //Call server to retrieve statistics and place it into userStats hook

    const [userStats, setUserStats] = useState("");

    //Create effect hook that grabs the user information and statistics based on the userid
    


    return(
        <div>
            {props.user.userID}
            <Profile user={props.user}/>
            <Statistics />
            {/* <button onClick=route}>Start New Game</button> */}

        </div>
    );
}

export default Homepage;