import React, {useState} from 'react';
import './Signup.css';
import logo from '../../assets/logo.png';
import formImg from '../../assets/form-img.png';
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Signup = () => {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/register/', { firstName, lastName, username, password }) // Removed extra comma
            .then(res => {
                localStorage.setItem('token', res.data.token);
                console.log("This is the token " + res.data.token);
                navigate('/onboarding-one');
                
            })
            .catch(error => {
                console.error("Authentication error: ", error);
                alert("Signup failed. Please try again."); // Notify the user about the error
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
                    <form className="auth-form" onSubmit={(e) => {handleSubmit(e)}}>
                        <div className="flex-row">
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                        </div>
                        <div className="flex-row">
                            <input type="checkbox" name="terms-accept" id="terms-accept" required />
                            <label htmlFor="terms-accept">By signing up I accept the terms and conditions</label>
                        </div>
                        <div className="form-group">
                            <button type="submit">Sign Up</button>
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
                            <p>Returning User? <NavLink to="/login">Log In</NavLink></p>
                        </div>
                    </form>
                </div>
                <div className="img-side">
                    <img src={formImg} alt="form-img" />
                </div>
            </div>
        </div>
    )
}

export default Signup;