import React, {useState} from 'react';
import './Signup.css';
import logo from '../../assets/logo.png';
import formImg from '../../assets/form-img.png';
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Signup = () => {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, password)
        navigate('/onboarding-one')
    }

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
                                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
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