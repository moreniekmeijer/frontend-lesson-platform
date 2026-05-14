import {useContext, useState} from "react";
import {NavLink} from "react-router-dom";
import styles from "./MenuIcon.module.css";
import {AuthContext} from "../../context/AuthContext.jsx";

const MenuIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {logout, user} = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => setIsOpen(false);
    const isAdmin = user.roles.includes("ROLE_ADMIN");


    return (
        <div
            className={styles.menuContainer}
        >
            <button onClick={toggleMenu} className={styles.menuButton}>
                <svg width="26" height="26" viewBox="0 -2 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="5"  r="2"/>
                <circle cx="12" cy="12" r="2"/>
                <circle cx="12" cy="19" r="2"/>
                </svg>
            </button>

            {isOpen && (
                <ul onMouseLeave={closeMenu} className={styles.dropdownMenu}>
                    <li className={styles.dropdownItem}>
                        <NavLink to="/inloggen" onClick={logout}>Log uit</NavLink>
                    </li>
                    <li className={styles.dropdownItem}>
                        <NavLink to="/account">Account</NavLink>
                    </li>
                    {isAdmin && (
                        <li className={styles.dropdownItem}>
                            <NavLink to="/gebruikers">Gebruikers</NavLink>
                        </li>
                    )}
                    <li className={styles.dropdownItem}>
                        <NavLink to="/help">Help</NavLink>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default MenuIcon;
