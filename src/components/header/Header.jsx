import React from "react";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";
import {Link} from "react-router-dom"; // Voor het menu-icoon

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.leftContainer}>
                <h2><Link to="/" className={styles.headerTitle}>Lesson Platform</Link></h2>
            </div>
            <div className={styles.rightContainer}>
                <ul>
                    <li className={styles.menuIcon}><FaBars/></li>
                    <li className={styles.profile}>
                        <div className={styles.profileCircle}>NM</div>
                        <span className={styles.accountName}>Niek Meijer</span>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
