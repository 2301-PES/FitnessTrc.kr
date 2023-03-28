import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
require('dotenv').config();

const Login = (props) => {
    const {isLoggedIn, setIsLoggedIn} = props;
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // "https://fitnesstrac-kr.herokuapp.com/api/users/login"

    const navigate = useNavigate();

    async function sendLoginRequest(e) {
        e.preventDefault();
        try {
            // const response = await fetch("http://localhost:1337/api/users/login",
            // const response = await fetch(`${process.env.DATABASE_URL}/api/users/login`,
                const response = await fetch('https://fitnesstrac-kr-pes.onrender.com/api/users/login', 
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                            username: username,
                            password: password
                    })
                }
            )

            const translatedData = await response.json();

            if (!translatedData.success) {
                console.log(translatedData);
                alert('Login failed.');
            } else {
                const myJWT = translatedData.token;
                localStorage.setItem("token", myJWT);
                setIsLoggedIn(!isLoggedIn);
                navigate('/');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async function sendRegisterNewAccountReq(e){
        e.preventDefault();
        try {

            if (newPassword.length < 8) {
                alert('Password is too short. Must be 8 characters.');
                return;
            } else if (newUsername.length < 8) {
                alert('Username is too short. Must be 8 characters.');
                return;
            }
            // const response = await fetch(`${process.env.DATABASE_URL}/api/users/register`,
            const response = await fetch('https://fitnesstrac-kr-pes.onrender.com/api/users/register',
                { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                            username: newUsername,
                            password: newPassword
                    })
                }
            )

            const translatedData = await response.json();
                // console.log(translatedData)
            if (translatedData.error) {
                alert('Account was not successfully created. Please try again.')
            } else {
                const myJWT = translatedData.token;
                setIsLoggedIn(!isLoggedIn);
                localStorage.setItem("token", myJWT);
                navigate('/');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div id="loginFieldsAndButtons">
            <p>Do you already have an account? Login below:</p>
            <form id="existingAccountFields">
                <input className="usernamePasswordField" type='text' placeholder="Please enter your Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                <input className="usernamePasswordField" type='text' placeholder="Please enter your Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button className="usernamePasswordButton" onClick={sendLoginRequest}>Existing User Login</button>
            </form>

            <p>Are you new here? Create an account below:</p>
            <form id="newAccountFields">
                <input className="usernamePasswordField" type='text' placeholder="Create a New Username" value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                <input className="usernamePasswordField" type='text' placeholder="Create a New Password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                <button className="usernamePasswordButton" onClick={sendRegisterNewAccountReq}>Create Account</button>
            </form>
        </div>
    )
}

export default Login