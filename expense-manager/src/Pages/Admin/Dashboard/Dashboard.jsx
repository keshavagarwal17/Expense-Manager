import './Dashboard.scss';
import { useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../../Components/Loader/Loader';
import axios from 'axios';
import LoadingData from '../../../Components/LoadingData/LoadingData'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [fetchingData, setFetch] = useState(false);
    const [users,setUser] = useState([]);
    const history = useHistory();
    const fetchData = async () => {
        let res = await axios.get('https://expense-manager01.herokuapp.com/auth/getUser');
        if (!(res.data.user)) {
            history.push("/admin/login")
        }
        if (!(res.data.admin)) {
            history.push("/dashboard")
        }
        setLoading(false);
        setFetch(true);
        res = await axios.get('https://expense-manager01.herokuapp.com/admin/dashboard')
        setUser(res.data.users);
        setFetch(false);
    }
    useEffect(() => {
        fetchData();
    }, [])


    const renderUser = (user,index)=>{
        return (
            <div className="user-card" key={index} onClick={()=>history.push({pathname: 'expense', data:{id:user.id,name:user.name}})}>
                <div><b>Name : </b>{user.name}</div>
                <div><b>Email : </b>{user.email}</div>
            </div>
        );
    }

    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div className="admin-dashboard">
                    <AdminNavbar />
                    <div className="dashboard">
                        <h2>Admin Dashboard</h2>
                        {fetchingData && <LoadingData />}
                        {!fetchingData && <div>
                            <h3>List of All Active Users</h3>
                            <p>click on user card to see all expenses of that particular user.</p>
                            {users.map((user,index)=>renderUser(user,index))}
                        </div>}
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;