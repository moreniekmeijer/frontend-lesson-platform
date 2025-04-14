import styles from "./Aside.module.css";
import {Link, NavLink, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import useApiRequest from "../../hooks/useApiRequest.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function Aside() {
    const location = useLocation();
    const isStylesActive = location.pathname.startsWith('/stijlen');
    const isUploadActive = location.pathname.startsWith('/toevoegen');
    const {isAuth, user} = useContext(AuthContext);

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
                    {/* Home - alleen zichtbaar als ingelogd */}
                    {isAuth && (
                        <li>
                            <NavLink to="/"
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}

                    {isAuth && stylesList?.length > 0 && (
                        <>
                            <li>
                                <NavLink to="/stijlen"
                                         className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                    Stijlen
                                </NavLink>
                            </li>

                            {isStylesActive && (
                                <ul className={styles.submenu}>
                                    {stylesList.map(style => (
                                        <li key={style.id}>
                                            <NavLink to={`/stijlen/${style.id}`}
                                                     className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}>
                                                {style.name}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}

                    {isAuth && (
                        <li>
                            <NavLink to="/zoeken"
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Materiaal
                            </NavLink>
                        </li>
                    )}

                    {isAuth && user?.role === 'admin' && (
                        <>
                            <li>
                                <NavLink to="/toevoegen"
                                         className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                    Toevoegen
                                </NavLink>
                            </li>

                            {isUploadActive && (
                                <ul className={styles.submenu}>
                                    <li>
                                        <NavLink
                                            to="/toevoegen/materiaal"
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Materiaal
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/toevoegen/stijl"
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Stijl
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/toevoegen/les"
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Les
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </>
                    )}

                    {loading && <p className={styles.loading}>Laden...</p>}
                    {error && <p className={styles.error}>Fout bij ophalen stijlen: {error}</p>}
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
