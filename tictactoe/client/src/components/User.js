import React from 'react';
import '../stylesheets/Profile.css';

function User(props) {

    const nameElement = <p></p>
    const emailElement = <p></p>
    const ageElement = <p></p>

    return (
        <div className="profile-root">
            <div className="profile-avatar">
                Test
            </div>
            <div className="profile-info">
                <ul>
                    <li>
                        <div className="profile-username">
                            <p>Name</p>
                            {nameElement}
                        </div>
                    </li>
                    <li>
                        <div className="profile-email">
                            <p>Email</p>
                            {emailElement}
                        </div>
                    </li>
                    <li>
                        <div className="profile-age">
                            <p>Age</p>
                            {ageElement}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}


export default User;