import React, {useState} from 'react';
import axios from 'axios';
import './Login.css';

function Login(props) {

    // useState Hooks to keep information
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState({status: false, error: ''});

    const errorStatus = errorMsg.status ? errorMsg.error : null;

    // Authenticate with server database
    const authenticate = (e) => {
        e.preventDefault();
        console.log("Logging in with following credentials => ", "username:" , username, "password:", password);

        // Call authentication with server and return userid/cookie
        axios.post('/api/login', {
            username: username,
            password: password
        })
        .then((response) => {
            if (response.data.success) {
                console.log("Login successful");
                props.login(response.data.user);
            }
            else {
                console.log("Login unsuccessful");
                setErrorMsg({status: true, error: <p className="login-error-message">Error: {response.data.error}</p>});
            }
        })
        .catch((err) => {
            console.log("Unexpected error has occurred");
            console.log(err);
        });
    }

    return (
        <div className="login-root">
            <div className="login-container">
                <div className="login-app-info">
                    {/* <h1>Tic-Tac-Toe</h1>
                    <h3>
                        A multiplayer Tic-Tac-Toe application using React.js, Express.js, MongoDB, and Socket.io.
                    </h3> */}
                </div>
                <div className="login-input">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={authenticate}>
                        <input type="text" name="username" placeholder="Username" value={username} required
                            onChange={(e) => setUsername(e.target.value)}/>
                        <input type="password" name="password" placeholder="Password" value={password} required
                            onChange={(e) => setPassword(e.target.value)}/>
                        <input type="submit" value="Log In"/>
                    </form>
                    <div className="login-error">
                        {errorStatus}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;