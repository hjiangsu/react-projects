import React, { useState, Fragment } from 'react';
import Profile from '../components/Profile.js';
import Statistics from '../components/Statistics.js';
import Game from './Game.js';
import Header from '../components/Header.js';
import '../stylesheets/Homepage.css';

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
            <Fragment>
                <Header 
                    page={'home'} 
                    logout={() => {
                        props.updateAuthentication();
                    }}
                />
                <div className="homepage-root">
                    <div className="homepage-container">
                        <div className="homepage-left">
                            <Profile user={props.user} />
                            <div className="homepage-game">
                                <button onClick={() => setStartGame(true)}>Start New Game</button>
                            </div>
                        </div>
                        <div className="homepage-right">
                            <Statistics />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Homepage;