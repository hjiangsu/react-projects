import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios';

import {useAuth} from '../context/auth.js';
import '../stylesheets/Register.css';
import { Redirect } from 'react-router-dom';

function Register(props) {

    // Create the hooks required by the login screen
    const { authStatus, setAuthStatus } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const [isRegistered, setIsRegistered] = useState(false);
    // const history = useHistory();

    const [errorMsg, setErrorMsg] = useState({status: false, error: ''});
    const errorStatus = errorMsg.status ? errorMsg.error : null;

    // Checks to see if both password fields are the same
    useEffect(() => {
        const checkPassword = () => {
            if (password !== passwordConfirm) {
                setErrorMsg({status:true, error:<p>Error: Passwords do not match</p>});
            }
            else {
                setErrorMsg({status:false, error: ''});
            }
        }

        checkPassword();
    }, [password, passwordConfirm]);

    // Creates the account
    const createAccount = (e) => {
        e.preventDefault();

        if (password === passwordConfirm) {
            // Make a request to the server and pass on the user details
            axios.post('/api/register', {
                username: username,
                password: password,
                email: email,
                age: age
            })
            // promis is resolved and sets the correct hooks
            .then((response) => {
                console.log(response.data.error)
                if (response.data.success) {
                    console.log("Successfully registered new user");
                    setAuthStatus(true);
                    setIsRegistered(true);
                }
                else {
                    console.log("Error occurred while registering new user");
                    setErrorMsg({status:true, error:<p>Error: {response.data.error}</p>});
                }
            })
            .catch((err) => {
                console.log("Unexpected error has occurred");
                console.log(err);
            })
        }
    }

    // Redirect to profile if user is already authenticated
    if (isRegistered || authStatus) {
        return <Redirect to='/profile' />
    }
    // Otherwise, show the register page
    return (
        <Fragment>
            <div className="register-root">
                <div className="register-container">
                    <div className="register-info">
                        {/* add content here */}
                    </div>
                    <div className="register-input">
                        <h1>Register</h1>
                        <form id="register-form" className="register-form" onSubmit={createAccount}>
                            <input 
                                type="text" 
                                name="username" 
                                value={username} 
                                placeholder="Username" 
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                />

                            <input 
                                type="password" 
                                name="password" 
                                value={password} 
                                placeholder="Password" 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                />

                            <input 
                                type="password" 
                                name="password-confirm" 
                                value={passwordConfirm} 
                                placeholder="Confirm Password" 
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                                />

                            <input 
                                type="email" 
                                name="email" 
                                value={email} 
                                placeholder="Email" 
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                />

                            <input 
                                type="number" 
                                name="age" 
                                value={age} 
                                placeholder="Age" 
                                onChange={(e) => setAge(e.target.value)}
                                required
                                />

                            <input 
                                type="submit" 
                                name="submit" 
                                value="Create an Account" 
                                />
                        </form>
                        <div className="register-error">
                            {errorStatus}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Register;