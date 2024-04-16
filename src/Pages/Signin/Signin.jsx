import React, {useState} from 'react';
import './Signin.css';
import logo from '../../assets/logo.png';
import formImg from '../../assets/form-img.png';
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Signin = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log( email, password)
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
                    <form className="auth-form" onSubmit={(e) => {handleSubmit()}}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}  required/>
                        </div>
                        <div className="flex-row-space">
                            <div className="flex-row">
                                <input type="checkbox" name="remember-me" id="remember-me" required />
                                <label htmlFor="remember-me">Remember me</label>
                            </div>
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
    )
}

export default Signin;