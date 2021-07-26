import './Dashboard.scss';
import Navbar from '../../Components/Navbar/NavbarAuth';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
import LoadingData from '../../Components/LoadingData/LoadingData'

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [fetchingData, setFetch] = useState(false);
    const [data, setData] = useState([]);
    const history = useHistory();
    const fetchData = async () => {
        let res = await axios.get('https://expense-manager01.herokuapp.com/auth/getUser');
        if (!(res.data.user)) {
            history.push("/auth/login")
        }
        if(res.data.admin){
            history.push("/admin/dashboard")
        }
        setLoading(false);
        setFetch(true);
        res = await axios.get('https://expense-manager01.herokuapp.com/getDashboardData')
        setAmount(res.data.amount);
        setData(res.data.expense);
        setFetch(false);
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <div className="dashboard">
                        {fetchingData && <LoadingData />}
                        {!fetchingData && <div>
                            <h3>Total Spent Amount : {amount} INR</h3>
                            <h4>Your Recent Transactions</h4>
                            {(data.length === 0) && <p className="no-expense">You Have Not Added Any Expense Yet. Please Go To Expense Link From Navbar and Add Some Of Your Expenses.</p>}
                            {
                                data.map((expense, index) => <ExpenseCard showIcon={false} expense={expense} index={index} />)
                            }
                        </div>}
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;