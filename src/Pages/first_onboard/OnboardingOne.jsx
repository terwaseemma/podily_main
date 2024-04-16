import React from 'react';
import './OnboardingOne.css';
import onboardOne from '../../assets/onboardone.png'; 
import logo from '../../assets/logo.png';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OnboardingOne = () => {

    const navigate = useNavigate()

    const publicSpeakingAreas = [
        {id: 1, value: 'Overcoming nerves/ Gaining confidence', checked: true},
        {id: 2, value: 'Speaking pace', checked: false},
        {id: 3, value: 'Removing filler words', checked: true},
        {id: 4, value: 'Facial expression', checked: false},
        {id: 5, value: 'Vocal clarity', checked: false},
        {id: 6, value: 'Using concise language', checked: true},
        {id: 7, value: 'Speaking with energy', checked: false},
        {id: 8, value: 'Intentional pausing', checked: false},
    ];

    const savePublicSpeakingAreas = () => {
        const selectedAreas = publicSpeakingAreas.filter(area => area.checked)
        console.log(selectedAreas)
        navigate('/onboarding-two')
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
                <div className="twenty-grey"></div>
            </div>
            <p>1 of 2</p>
            </div>

            <div className="flex-column2">
                <h2>What public speaking areas do you want to improve the most?</h2>
            </div>
            <div className="flex-column3">
                {
                    publicSpeakingAreas.map((area, index) => (
                        <div key={area.id} className={`flex-row area ${index % 2 === 1? "white-bg" : "grey-bg"}`}>
                            <input type="checkbox" />
                            <label>{area.value}</label>
                        </div>
                    ))
                }
            </div>
            <div className="flex-row-end">
                <button className='btn' onClick={() => {savePublicSpeakingAreas()}}>Continue <FaArrowRight/></button>
            </div>
        </div>
        <div className="second-col">
            <img src={onboardOne} alt="onboardOne" />
        </div>
    </div>
  )
}

export default OnboardingOne