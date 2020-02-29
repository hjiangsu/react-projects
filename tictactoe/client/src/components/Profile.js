import React from 'react';
import '../stylesheets/Profile.css';

function Profile(props) {

    const nameElement = <p>{props.user.username}</p>
    const emailElement = <p>{props.user.email}</p>
    const ageElement = <p>{props.user.age}</p>

    return(
        <div className="profile-root">
            <div className="profile-avatar">

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


export default Profile;