import styles from "./Aside.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useApiRequest from "../../hooks/useApiRequest.jsx";

function Aside() {
    const location = useLocation();
    const isStylesActive = location.pathname.startsWith('/stijlen');

    const {
        data: stylesList,
        loading,
        error,
        executeRequest,
    } = useApiRequest();

    useEffect(() => {
        void executeRequest('get', `${import.meta.env.VITE_API_URL}/styles`);
        console.log("style list: " + stylesList);
    }, []);

    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <ul className={styles.menu}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/stijlen" className={({ isActive }) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>Stijlen</NavLink>
                    </li>
                    {isStylesActive && stylesList?.length > 0 && (
                        <ul className={styles.submenu}>
                            {stylesList.map(style => (
                                <li key={style.id}>
                                    <NavLink to={`/stijlen/${style.id}`} className={({ isActive }) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}>
                                        {style.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                    <li>
                        <NavLink to="/materiaal" className={({ isActive }) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>Materiaal</NavLink>
                    </li>
                    <li>
                        <NavLink to="/uploaden" className={({ isActive }) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>Uploaden</NavLink>
                    </li>
                    {loading && <p className={styles.loading}>Laden...</p>}
                    {error && <p className={styles.error}>Fout bij ophalen stijlen: {error}</p>}
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
