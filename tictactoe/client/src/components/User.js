import React from 'react';

import { useUser } from '../context/usr.js';

import '../stylesheets/Profile.css';

function User(props) {

    const { userDetails } = useUser();
    console.log(userDetails)

    if(userDetails) {
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
                                {userDetails.username}
                            </div>
                        </li>
                        <li>
                            <div className="profile-email">
                                <p>Email</p>
                                {userDetails.email}
                            </div>
                        </li>
                        <li>
                            <div className="profile-age">
                                <p>Age</p>
                                {userDetails.age}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else {
        return (<div>Loading</div>);
    }
}


export default User;