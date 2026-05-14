import styles from "./Aside.module.css";
import {NavLink, useLocation} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";
import useApiRequest from "../../hooks/useApiRequest.js";
import {AuthContext} from "../../context/AuthContext.jsx";
function Aside({ mobileOpen, setMobileOpen }) {

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

    const closeMobile = () => setMobileOpen(false);

    return (
        <aside className={styles.aside}>
            {/* Inner wrapper gives position:relative anchor for the mobile dropdown */}
            <div className={styles.asideInner}>
            <nav className={`${styles.navigation} ${mobileOpen ? styles.mobileNavOpen : ''}`}>
                <ul className={styles.navigationContent} onMouseLeave={handleClose}>
                    {isAuth && (
                        <li>
                            <NavLink to="/" onClick={closeMobile}
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Dashboard
                            </NavLink>
                        </li>
                    )}

                    {isAuth && (
                        <li onMouseEnter={() => handleOpen("styles")}
                            // onMouseLeave={handleClose}
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
                                    {loading ? (
                                        <li>
                                            <span className={styles.defaultSubmenuLink}>Laden...</span>
                                        </li>
                                    ) : (
                                        stylesList?.sort((a, b) => a.name.localeCompare(b.name)).map(style => (
                                            <li key={style.id}>
                                                <NavLink to={`/stijlen/${style.id}`} onClick={closeMobile}
                                                         className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}>
                                                    {style.name}
                                                </NavLink>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}

                        </li>
                    )}

                    {error && <p className={styles.defaultMenuLink}>Fout bij ophalen stijlen: {error}</p>}

                    {isAuth && (
                        <li>
                            <NavLink to="/zoeken" onClick={closeMobile}
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Zoeken
                            </NavLink>
                        </li>
                    )}

                    {isAuth && (
                        <li>
                            <NavLink to="/opgeslagen" onClick={closeMobile}
                                     className={({isActive}) => isActive ? styles.activeMenuLink : styles.defaultMenuLink}>
                                Opgeslagen
                            </NavLink>
                        </li>
                    )}

                    {isAuth && user.roles.includes("ROLE_ADMIN") && (
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
                                            to="/toevoegen/materiaal" onClick={closeMobile}
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Materiaal
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/toevoegen/stijl" onClick={closeMobile}
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Stijl
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/toevoegen/les" onClick={closeMobile}
                                            className={({isActive}) => isActive ? styles.activeSubmenuLink : styles.defaultSubmenuLink}
                                        >
                                            Les
                                        </NavLink>
                                    </li>
                                </ul>
                            )}
                        </li>
                    )}
                </ul>
            </nav>
            </div>
        </aside>
    );
}

export default Aside;
