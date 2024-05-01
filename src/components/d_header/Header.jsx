import React, { useRef } from 'react'
import logo from '../../assets/logo.png';
import './Header.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import avarta from '../../assets/avarta.png';
import { NavLink } from 'react-router-dom';
import { FaTrophy, FaMicrophone, FaVideo } from 'react-icons/fa';

const Header = ({value}) => {

    const menuRef  = useRef(null);
    // const humburgerRef  = useRef(null);


    const toggleMenu = () => {
        menuRef.current.classList.toggle('none');
    }
  return (
    <section className='d-header'>
        <div className="header">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <ul className="d-nav">
                <li className={`${value === "library"? "active-route": ""}`}>
                    <NavLink to='/pitch-library'><FaTrophy/>Pitch Library </NavLink>
                </li>
                <li className={`${value === "practice"? "active-route": ""}`}>
                <NavLink to='/practice/:id'><FaMicrophone/>Practice</NavLink>
                </li>
                {/* <li className={`${value === "recordings"? "active-route": ""}`}>
                <NavLink to='/recordings'><FaVideo/>Recordings</NavLink>
                </li> */}
            </ul>
            <div className="end-nav">
                <div className="profile">
                    <img src={avarta} alt="avarta" />
                </div>
                <div className="profile-data">
                    <p>Hi, Amina</p>
                    <MdKeyboardArrowDown />
                </div>
                <div className="humburger" onClick={() => {toggleMenu()}}>
                    <IoMenu />
                </div>
            </div>
        </div>
        <ul className="m-nav none" ref={menuRef}>
            <li>
            <NavLink to='/pitch-library'><FaTrophy/>Pitch Library</NavLink>
            </li>
            <li>
            <NavLink to='/practice'><FaMicrophone/>Practice</NavLink>
            </li>
            {/* <li>
            <NavLink to='/recordings'><FaVideo/>Recordings</NavLink>
            </li> */}
        </ul>
    </section>
  )
}

export default Header