import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.png';
import './Header.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import avarta from '../../assets/avarta.png';
import { NavLink } from 'react-router-dom';
import { FaTrophy, FaMicrophone } from 'react-icons/fa';

const Header = ({ value }) => {
  const menuRef = useRef(null);
  const [username, setUsername] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      if (!token) {
        console.error("No authentication token found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          'https://podily-api-ymrsk.ondigitalocean.app/speak_assistant/username',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (response.data.username) {
          setUsername(response.data.username);
        }
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };

    fetchUsername(); // Call the function to fetch the username
  }, []); // No dependencies, so it runs only once when the component mounts

  return (
    <section className='d-header'>
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="d-nav">
          <li className={`${value === 'library' ? 'active-route' : ''}`}>
            <NavLink to='/pitch-library'>
              <FaTrophy /> Pitch Library
            </NavLink>
          </li>
          <li className={`${value === 'practice' ? 'active-route' : ''}`}>
            <NavLink to='/practice/3'>
              <FaMicrophone /> Practice
            </NavLink>
          </li>
        </ul>
        <div className="end-nav">
          <div className="profile">
            <img src={avarta} alt="avarta" />
          </div>
          <div className="profile-data">
            <p>Hi, {username || 'Guest'}</p>
            <MdKeyboardArrowDown />
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <IoMenu />
          </div>
        </div>
      </div>
      <ul className={`m-nav ${isMenuVisible ? '' : 'none'}`} ref={menuRef}>
        <li>
          <NavLink to='/pitch-library'>
            <FaTrophy /> Pitch Library
          </NavLink>
        </li>
        <li>
          <NavLink to='/practice'>
            <FaMicrophone /> Practice
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default Header;