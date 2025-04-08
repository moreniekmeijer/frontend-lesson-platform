import {useContext} from "react";
import styles from "./Header.module.css";
import MenuIcon from "../menuIcon/MenuIcon.jsx";
import {Link, NavLink} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import getInitials from "../../helpers/getInitials.jsx";

function Header() {
    const {user} = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.leftContainer}>
                <h2><Link to="/" className={styles.headerTitle}>Lesson Platform</Link></h2>
            </div>
            {user ?
                <ul className={styles.rightContainer}>
                    <li className={styles.menuIcon}><MenuIcon/></li>
                    {/*TODO - fill li items from GET users request*/}
                    <li>
                        <div className={styles.profileCircle}>{getInitials(user.username)}</div>
                    </li>
                    <li><span className={styles.accountName}>{user.username}</span></li>
                </ul>
                :
                <div className={styles.rightContainer}><NavLink className={styles.link} to="/register">Nieuw?</NavLink></div>}
        </header>
    );
}

export default Header;

