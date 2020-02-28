import React, { useState } from 'react';
import Profile from './Profile.js';
import Statistics from './Statistics.js';
import Game from './Game.js';
import './Homepage.css';

function Homepage(props) {

    const [startGame, setStartGame] = useState(false);


    //Call server to retrieve statistics and place it into userStats hook

    // const [userStats, setUserStats] = useState("");

    //Create effect hook that grabs the user information and statistics based on the userid
    

    if (startGame) {
        return (
            <Game />
        )
    }
    else {
        return (
            <div className="homepage-root">
                {props.user.username}
                <Profile user={props.user}/>
                <Statistics />
                <button onClick={() => setStartGame(true)}>Start New Game</button>
    
            </div>
        );
    }
}

export default Homepage;