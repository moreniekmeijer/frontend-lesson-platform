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
                <h2 className={styles.headerTitle}>Percussie Platform</h2>
            </div>
        </header>
    );
}

export function AuthHeader({ mobileOpen, setMobileOpen }) {
    const { user } = useContext(AuthContext);

    return (
        <header className={styles.authHeader}>
            <div className={styles.leftContainer}>
                <button
                    className={styles.mobileToggle}
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigatie"
                    aria-expanded={mobileOpen}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 -1 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                    >
                        <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </button>
                <h2>
                    <Link to="/" className={styles.headerTitle}>Percussie Platform</Link>
                </h2>
            </div>
            <ul className={styles.rightContainer}>
                <li>
                    <div className={styles.profileCircle}>{getInitials(user.fullName)}</div>
                </li>
                <li>
                    <span className={styles.accountName}>{user.fullName}</span>
                </li>
                <li className={styles.menuIcon}>
                    <MenuIcon />
                </li>
            </ul>
        </header>
    );
}

export default function Header({ mobileOpen, setMobileOpen }) {
    const { user } = useContext(AuthContext);

    return user ? <AuthHeader mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /> : <PublicHeader />;
}
