import React from "react";
import styles from "./Header.module.css";
import MenuIcon from "../menuIcon/MenuIcon.jsx";
import {Link} from "react-router-dom";

function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.leftContainer}>
                <h2><Link to="/" className={styles.headerTitle}>Lesson Platform</Link></h2>
            </div>
            <ul className={styles.rightContainer}>
                <li className={styles.menuIcon}><MenuIcon/></li>
                {/*TODO - fill li items from GET users request*/}
                <li><div className={styles.profileCircle}>NM</div></li>
                <li><span className={styles.accountName}>Niek Meijer</span></li>
            </ul>
        </header>
    );
}

export default Header;

