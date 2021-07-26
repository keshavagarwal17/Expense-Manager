import {NavLink,useHistory} from 'react-router-dom';
import axios from 'axios';

const AdminNavbar = ()=>{
    const history = useHistory();
    const logoutUser = async()=>{
        await axios.get("https://expense-manager01.herokuapp.com/auth/logout")
        history.push("/")
    }

    return (
        <nav className="navbar">
                        <h2>Expense-Manager</h2>
                        <ul>
                            <li><NavLink activeClassName="active-navLink" exact to="/admin/dashboard">Dashboard</NavLink></li>
                            <li onClick={logoutUser}>Logout</li>
                        </ul>
                    </nav>
    );
}

export default AdminNavbar;