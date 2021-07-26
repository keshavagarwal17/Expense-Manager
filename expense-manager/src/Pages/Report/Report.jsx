import './Report.scss';
import Navbar from '../../Components/Navbar/NavbarAuth';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import LoadingData from '../../Components/LoadingData/LoadingData'
import axios from 'axios';
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [fetchingData, setFetch] = useState(false);
    const [weeklyExpenseReport, setWeeklyReport] = useState([]);
    const [categoryExpenseReport, setCategoryReport] = useState([]);
    const history = useHistory();

    const fetchData = async () => {
        setFetch(true);
        let res = await axios.get("https://expense-manager01.herokuapp.com/report")
        console.log(res.data);
        setWeeklyReport(res.data.weeklyExpenseReport)
        setCategoryReport(res.data.categoryExpenseReport)
        setFetch(false);
    }

    const fetchUser = async () => {
        let res = await axios.get('https://expense-manager01.herokuapp.com/auth/getUser');
        if (!(res.data.user)) {
            history.push("/auth/login")
        }
        if(res.data.admin){
            history.push("/admin/dashboard")
        }
        setLoading(false);
        await fetchData();
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const renderWeeklyReport = (line,amount, index) => {
        return (
            <div key={index} className="weekly-report">
                <div>{line}</div>
                <div><b>Amount Spent :</b> {amount} INR</div>
            </div>
        );
    }

    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <div className="report">
                        <h3>Report</h3>
                        {fetchingData && <LoadingData />}
                        {!fetchingData &&
                            <div>
                                <div>
                                    <h3>Weekly Expenditure of Current Month</h3>
                                    {weeklyExpenseReport.map((data, index) => renderWeeklyReport(`${data.startDate} to ${data.endDate}`,data.amount, index))}
                                </div>
                                <div className="category-wise-report">
                                    <h3>Category Wise Expenditure of Current Month</h3>
                                    {categoryExpenseReport.map((data, index) => renderWeeklyReport(data.category,data.amount, index))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;