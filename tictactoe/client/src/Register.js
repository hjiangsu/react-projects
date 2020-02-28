import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

function Register(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const createAccount = (e) => {
        e.preventDefault();

        axios.post('/api/register', {
            username: username,
            password: password,
            email: email,
            age: age
        })
        .then((data) => {
            if (data.success) {
                console.log("successfully registered")
            }
        })
        .catch((error) => {
            console.log("error occurred");
            console.log(error);
        })
    }

    return (
        <div className="register-root">
            <div className="register-container">
                <div className="register-info">

                </div>
                <div className="register-input">
                    <h1>Register</h1>
                    <form id="register-form" className="register-form" onSubmit={createAccount}>
                        <input type="text" name="username" value={username} placeholder="Username" required 
                            onChange={(e) => setUsername(e.target.value)}/>

                        <input type="password" name="password" value={password} placeholder="Password" required 
                            onChange={(e) => setPassword(e.target.value)}/>

                        <input type="password" name="password-confirm" value={passwordConfirm} placeholder="Confirm Password" required 
                            onChange={(e) => setPasswordConfirm(e.target.value)}/>

                        <input type="email" name="email" value={email} placeholder="Email" required 
                            onChange={(e) => setEmail(e.target.value)}/>

                        <input type="number" name="age" value={age} placeholder="Age" required 
                            onChange={(e) => setAge(e.target.value)}/>

                        <input type="submit" name="submit" value="Register" />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register;