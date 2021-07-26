import './Navbar.scss';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const history = useHistory();
    const logoutUser = async()=>{
        await axios.get("https://expense-manager01.herokuapp.com/auth/logout")
        history.push("/")
    }
    return (
        <div className="navbar">
            <h2>Expense-Manager</h2>
            <ul>
                <li><NavLink activeClassName="active-navLink" exact to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink activeClassName="active-navLink" to="/expenses">Expenses</NavLink></li>
                <li><NavLink activeClassName="active-navLink" to="/report">Reports</NavLink></li>
                <li onClick={logoutUser}>Logout</li>
            </ul>
        </div>
    );
}

export default Navbar;