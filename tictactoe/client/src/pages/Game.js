import React from 'react';
import {useHistory} from 'react-router-dom';

function Game(props) {

    const history = useHistory()

    return (
        <div className="game-queue-root">
            
            <button onClick={history.push('/profile')}/>
        </div>
    );
}

export default Game;