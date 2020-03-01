import React from 'react';
import '../stylesheets/Statistics.css';

function Statistics(props) {
    return(
        <div className="statistics-root">
            <div className="statistics-header">
                <h1>Statistics</h1>
            </div>
            <div className="statistics-main">
                <h2>Overall</h2>
                {/* display total wins, total losses, total plays, etc */}
            </div>
            <div className="statistics-individual-matches">
                <h2>Previous Matches</h2>
                {/* displays list of previous match date, time, opponent username, game status */}
            </div>
        </div>
    );
}

export default Statistics;