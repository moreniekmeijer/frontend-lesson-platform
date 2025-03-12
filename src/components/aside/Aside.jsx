import './Aside.css'
import {NavLink} from "react-router-dom";

function Aside() {
    return (
        <aside>
            <nav className="navigation">
                <ul>
                    <li><NavLink to="/" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Home</NavLink></li>
                    <li><NavLink to="/stijlen" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Stijlen</NavLink></li>
                    <li><NavLink to="/materiaal" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Materiaal</NavLink></li>
                    <li><NavLink to="/uploaden" className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}>Uploaden</NavLink></li>
                </ul>
            </nav>
        </aside>
    )
}

export default Aside;