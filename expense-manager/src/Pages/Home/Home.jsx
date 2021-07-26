import './Home.scss';
import { useHistory } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const fetchUser = async () => {
        let res = await axios.get('https://expense-manager01.herokuapp.com/auth/getUser');
        if(res.data.admin){
            history.push("/admin/dashboard")
        }
        if (res.data.user) {
            history.push("/dashboard")
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchUser();
    }, [])
    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <div className="landing-page">
                        <div className="landing-text">
                            <p className="tagLine">Welcome to Expense Manager</p>
                            <p>Key Features of this Application</p>
                            <ul>
                                <li>Keep Record of How Much you spend.</li>
                                <li>Add Your Expenses According to Category.</li>
                                <li>You Can See All of Your Expenses At One Place.</li>
                                <li>You Can Filter Your Expenses According to Category.</li>
                                <li>You Can Update or Delete Your Previous Added Expenses.</li>
                                <li>You Can See Your Category Wise Expense of Current Month.</li>
                                <li>You Can See Your Weekly Expense Report of Current Month.</li>
                            </ul>
                        </div>
                        <div className="landing-img">
                            <img src={"assets/home.svg"} alt="" />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Home;