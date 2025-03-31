import './Aside.css'
import {NavLink, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Aside() {
    const location = useLocation();
    const isStylesActive = location.pathname.startsWith('/stijlen');
    const [styles, setStyles] = useState([]);

    useEffect(() => {
        const fetchStyles = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/styles`);
                setStyles(response.data);
            } catch (error) {
                console.error("Error fetching styles:", error);
            }
        };

        void fetchStyles();
    }, []);

    return (
        <aside>
            <nav className="navigation">
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}>Home</NavLink></li>
                    <li><NavLink to="/stijlen" className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}>Stijlen</NavLink></li>
                    {isStylesActive && styles.length > 0 && (
                        <ul className="submenu">
                            {styles.map(style => (
                                <li key={style.id}>
                                    <NavLink to={`/stijlen/${style.id}`} className={({ isActive }) => isActive ? 'active-submenu-link' : 'default-submenu-link'}>
                                        {style.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                    <li><NavLink to="/materiaal" className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}>Materiaal</NavLink></li>
                    <li><NavLink to="/uploaden" className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}>Uploaden</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
