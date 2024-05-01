import React, {useState} from 'react';
import './Signin.css';
import logo from '../../assets/logo.png';
import formImg from '../../assets/form-img.png';
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {

    const navigate = useNavigate();

    // const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/login/', { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                console.log("Token:", res.data.token);
                console.log(username, password);
                navigate('/pitch-library');
            })
            .catch(error => {
                console.error("Authentication error: ", error);
            });
    };

    return (
        <div className='flex-column full-width main'>
            <div className="flex-row-space full-width">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className="signup-cont">
                <div className="form-side">
                    <h2>
                        Begin Your Journey
                    </h2>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="flex-row-space">
                            {/* <div className="flex-row">
                                <input type="checkbox" name="remember-me" id="remember-me" required />
                                <label htmlFor="remember-me">Remember me</label>
                            </div> */}
                            <div className="flex-row">
                                <NavLink to="/forgot-password">Forgot Password?</NavLink>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit">Login</button>
                        </div>
                        <div className="flex-row-center">
                            <div className="icon">
                                <FaGoogle />
                            </div>
                            <div className="icon">
                                <FaFacebook />
                            </div>
                            <div className="icon">
                                <FaApple />
                            </div>
                        </div>
                        <div className="flex-row-center">
                            <p>Don't have an account? <NavLink to="/signup">Signup</NavLink></p>
                        </div>
                    </form>
                </div>
                <div className="img-side">
                    <img src={formImg} alt="form-img" />
                </div>
            </div>
        </div>
    );
}

export default Signin;