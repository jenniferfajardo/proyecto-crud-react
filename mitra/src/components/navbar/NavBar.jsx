import { NavLink } from 'react-router-dom';
import './NavBar.css';
import mitralogo from "./mitralogo.svg";

const NavBar = () => {
    return (

        <nav>
            <div className="nav-logo">
                <img src={mitralogo} alt="logo-mitra" />
            </div>
            <ul className="nav-menu">
                <li className="nav-item"><span className="material-symbols-rounded">Home</span><NavLink to="/home">Inicio</NavLink></li>                
                <li className="nav-item"><span className="material-symbols-rounded">settings</span><NavLink to="/config">Configuración</NavLink></li>
                <hr className="hr-separator" />
                <li className="nav-item"><NavLink to="/dashboard/employees" className="item-intro">Empleados</NavLink></li>
                <li className="nav-item"><NavLink to="/dashboard/pockets" className="item-intro">Bolsillos</NavLink></li>
                <hr className="hr-separator" />
                <li className="nav-item"><span className="material-symbols-rounded">logout</span><NavLink to="/logout">Cerrar sesión</NavLink></li>
            </ul>

        </nav>

    );
};


export default NavBar;
