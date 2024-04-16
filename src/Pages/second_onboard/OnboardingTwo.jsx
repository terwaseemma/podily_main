import React from 'react'
import './OnboardingTwo.css';
import onboardTwo from '../../assets/onboardtwo.png'; 
import logo from '../../assets/logo.png';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import avarta from '../../assets/onboardavarta.png';

const OnboardingTwo = () => {
    const navigate = useNavigate()

    const audience = [
        {id: 1, value: 'My team at work', selected: false},
        {id: 2, value: 'Superior(s) at work', selected: true},
        {id: 3, value: 'My classmates in school', selected: false},
        {id: 4, value: 'Customers or clients', selected: false},
        {id: 5, value: 'groups of 50+ people', selected: false},
        {id: 6, value: 'Other audience', selected: false},
    ];

    const savePublicSpeakingAreas = () => {
        const selectedAreas = audience.filter(area => area.selected)
        console.log(selectedAreas)
        navigate('/pathways')
    }



  return (
    <div className='onboard'>
        <div className="first-col">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="flex-column2 full-width">
            <div className="flex-row">
                <div className="active-blue twenty-grey"></div>
                <div className="twenty-grey active-blue"></div>
            </div>
            <p>2 of 2</p>
            </div>

            <div className="flex-column2">
                <h2>Who is your main audience when giving presentations?</h2>
            </div>
            <div className="flex-column2">
                {
                    audience.map((area) => (
                        <div key={area.id} className={`flex-row-space audience ${!area.selected? "greybd" : "light-blue-bd"}`}>
                            <div className="flex-row">
                                <img src={avarta} alt="avarta" />
                                <label>{area.value}</label>
                            </div>
                            <FaArrowRight />
                        </div>
                    ))
                }
            </div>
            <div className="flex-row-space">
                <NavLink to="/onboarding-one" btn-link>
                    <FaArrowLeft/> 
                    Back</NavLink>
                <button className='btn' onClick={() => {savePublicSpeakingAreas()}}>Continue <FaArrowRight/></button>
            </div>
        </div>
        <div className="second-col">
            <img src={onboardTwo} alt="onboardOne" />
        </div>
    </div>
  )
}

export default OnboardingTwo