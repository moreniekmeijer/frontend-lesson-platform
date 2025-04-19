import styles from "./Aside.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import useApiRequest from "../../hooks/useApiRequest.js";
import {AuthContext} from "../../context/AuthContext.jsx";

function Aside() {
    const {isAuth, user} = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(null);
    const [clickedMenu, setClickedMenu] = useState(null);
    const timeoutRef = useRef(null);
    const location = useLocation();

    const {
        data: stylesList,
        loading,
        error,
        executeRequest,
    } = useApiRequest();

    useEffect(() => {
        void executeRequest('get', `${import.meta.env.VITE_API_URL}/styles`);
    }, []);

    const handleOpen = (menu) => {
        clearTimeout(timeoutRef.current);
        setOpenMenu(menu);
    };

    const handleClose = () => {
        timeoutRef.current = setTimeout(() => {
            setOpenMenu(null);
        }, 200);
    };

    const toggleMenu = (menu) => {
        setClickedMenu((prev) => (prev === menu ? null : menu));
    };

    const isMenuOpen = (menu) => {
        const isCurrentPathActive =
            (menu === 'styles' && location.pathname.startsWith('/stijlen/')) ||
            (menu === 'upload' && location.pathname.startsWith('/toevoegen/'));

        return openMenu === menu || clickedMenu === menu || isCurrentPathActive;
    };

    return (
        <aside className={styles.aside}>
            <nav className={styles.navigation}>
                <ul className={styles.navigationContent}>
                    {isAuth && (
                        <li>
                            <NavLink to="/"
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}

                    {isAuth && stylesList?.length > 0 && (
                        <li onMouseEnter={() => handleOpen("styles")}
                            onMouseLeave={handleClose}
                            className="hasSubmenu"
                        >
                            <span
                                className={styles.defaultMenuLink}
                                onClick={() => toggleMenu("styles")}
                            >
                                Stijlen
                            </span>

                            {isMenuOpen("styles") && (
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
                        </li>
                    )}

                    {isAuth && (
                        <li>
                            <NavLink to="/zoeken"
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Zoeken
                            </NavLink>
                        </li>
                    )}

                    {isAuth && (
                        <li>
                            <NavLink to="/opgeslagen"
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Opgeslagen
                            </NavLink>
                        </li>
                    )}

                    {isAuth && user?.role === 'admin' && (
                        <li
                            onMouseEnter={() => handleOpen('upload')}
                            onMouseLeave={handleClose}
                            className={styles.hasSubmenu}
                        >
                            <span
                                className={styles.defaultMenuLink}
                                onClick={() => toggleMenu("upload")}
                            >
                                Toevoegen
                            </span>

                            {isMenuOpen("upload") && (
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
                        </li>
                    )}

                    {loading && <p className={styles.loading}>Laden...</p>}
                    {error && <p className={styles.error}>Fout bij ophalen stijlen: {error}</p>}
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
