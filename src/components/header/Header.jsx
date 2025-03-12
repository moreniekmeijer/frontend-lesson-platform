import React from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa";
import {Link} from "react-router-dom"; // Voor het menu-icoon

function Header() {
    return (
        <header className="header">
            <div className="left-container">
                <h2><Link to="/" className="header-title">Lesson Platform</Link></h2>
            </div>
            <div className="right-container">
                <ul>
                    <li className="menu-icon"><FaBars/></li>
                    <li className="profile">
                        <div className="profile-circle">NM</div>
                        <span className="account-name">Niek Meijer</span>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
