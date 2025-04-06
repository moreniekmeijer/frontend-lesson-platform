import {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import styles from "./MenuIcon.module.css";
import {AuthContext} from "../../context/AuthContext.jsx";

const MenuIcon = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {logout} = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    return (
        <div
            className={styles.menuContainer}
        >
            <button onClick={toggleMenu} className={styles.menuButton}>
                <svg
                    width="30"
                    height="30"
                    viewBox="0 -2 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="black"
                >
                    <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {isOpen && (
                <ul onMouseLeave={closeMenu} className={styles.dropdownMenu}>
                    <li className={styles.dropdownItem}><NavLink to="/login" onClick={logout}>Log uit</NavLink></li>
                    <li className={styles.dropdownItem}>Optie 2</li>
                    <li className={styles.dropdownItem}>Optie 3</li>
                </ul>
            )}
        </div>
    );
};

export default MenuIcon;
