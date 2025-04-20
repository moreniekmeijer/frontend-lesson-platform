import {useContext} from "react";
import styles from "./Header.module.css";
import MenuIcon from "../menuIcon/MenuIcon.jsx";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import getInitials from "../../helpers/getInitials.js";

export function PublicHeader() {
    return (
        <header className={styles.publicHeader}>
            <div className={styles.centerContainer}>
                <h2 className={styles.headerTitle}>Percussie Les Platform</h2>
            </div>
        </header>
    );
}

export function AuthHeader() {
    const { user } = useContext(AuthContext);

    return (
        <header className={styles.authHeader}>
            <div className={styles.leftContainer}>
                <h2>
                    <Link to="/" className={styles.headerTitle}>Percussie Les Platform</Link>
                </h2>
            </div>
            <ul className={styles.rightContainer}>
                <li className={styles.menuIcon}>
                    <MenuIcon />
                </li>
                <li>
                    <div className={styles.profileCircle}>{getInitials(user.username)}</div>
                </li>
                <li>
                    <span className={styles.accountName}>{user.username}</span>
                </li>
            </ul>
        </header>
    );
}

export default function Header() {
    const { user } = useContext(AuthContext);

    return user ? <AuthHeader /> : <PublicHeader />;
}
