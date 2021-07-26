import './Navbar.scss';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="navbar">
            <h2>Expense-Manager</h2>
            <ul>
                <li><NavLink activeClassName="active-navLink" exact to="/">Home</NavLink></li>
                <li><NavLink activeClassName="active-navLink" to="/auth/login">Login</NavLink></li>
                <li><NavLink activeClassName="active-navLink" to="/auth/register">Register</NavLink></li>
                <li><NavLink activeClassName="active-navLink" to="/admin/login">Admin Login</NavLink></li>
            </ul>
        </div>
    );
}

export default Navbar;