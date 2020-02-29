import React from 'react';
import '../stylesheets/Statistics.css';

function Statistics(props) {
    return(
        <div className="statistics-root">
            <div className="statistics-main">
                {/* display total wins, total losses, total plays, etc */}
            </div>
            <div className="statistics-individual-matches">
                {/* displays list of previous match date, time, opponent username, game status */}
            </div>
        </div>
    );
}

export default Statistics;