import React from "react";
import "./Header.css";
import { FaBars } from "react-icons/fa"; // Voor het menu-icoon

function Header() {
    return (
        <header className="header">
            <div className="left-container">
                <h1>Lesson Platform</h1>
            </div>
            <div className="right-container">
                <ul>
                    <li className="menu-icon"><FaBars /></li>
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
