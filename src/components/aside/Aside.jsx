import './Aside.css'
import {NavLink, useLocation} from "react-router-dom";

function Aside() {
    const location = useLocation();
    const isStylesActive = location.pathname.startsWith('/stijlen');

    return (
        <aside>
            <nav className="navigation">
                <ul>
                    <li><NavLink to="/" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Home</NavLink></li>
                    <li><NavLink to="/stijlen" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Stijlen</NavLink></li>
                    {isStylesActive && (
                        <ul className="submenu">
                            <li><NavLink to="/stijlen/stijl1" className={({ isActive }) => isActive ? 'active-submenu-link' : 'default-submenu-link'}>Stijl 1</NavLink></li>
                            <li><NavLink to="/stijlen/stijl2" className={({ isActive }) => isActive ? 'active-submenu-link' : 'default-submenu-link'}>Stijl 2</NavLink></li>
                        </ul>
                    )}
                    <li><NavLink to="/materiaal" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Materiaal</NavLink></li>
                    <li><NavLink to="/uploaden" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Uploaden</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Aside;