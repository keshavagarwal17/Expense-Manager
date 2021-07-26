import './Expense.scss';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Message} from 'semantic-ui-react';
import Loader from '../../../Components/Loader/Loader';
import axios from 'axios';
import LoadingData from '../../../Components/LoadingData/LoadingData'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import ExpenseCard from '../../../Components/ExpenseCard/ExpenseCard';

const Expense = (data) => {
    const [loading, setLoading] = useState(true);
    const [fetchingData, setFetch] = useState(false);
    const [expenses, setExpense] = useState([])
    const history = useHistory();
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const fetchData = async () => {
        let res = await axios.get('http://localhost:5000/auth/getUser');
        if (!(res.data.user)) {
            return history.push("/admin/login")
        }
        if (!(res.data.admin)) {
            return history.push("/dashboard")
        }
        if(data.location.data===undefined){
            return history.push("dashboard")
        }
        setId(data.location.data.id);
        setName(data.location.data.name);
        setLoading(false);
        setFetch(true);
        let curId = data.location.data.id;
        res = await axios.get(`http://localhost:5000/admin/list/${curId}`);
        setExpense(res.data.expenses)
        setFetch(false);
    }

    const deleteExpense = async (id1) => {
        setExpense(expenses.filter((exp) => exp.id !== id1))
        await axios.delete(`http://localhost:5000/admin/delete/${id}/${id1}`)
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div className="admin-dashboard">
                    <AdminNavbar />
                    <div className="dashboard">
                        {fetchingData && <LoadingData />}
                        {!fetchingData && <div>
                            <h3>List of All Expenses Made By {name}</h3>
                            {!fetchingData && !expenses.length &&
                                <Message info>
                                    <Message.Header>This User Have Not Added Any Expense Yet.</Message.Header>
                                </Message>
                            }
                            {expenses.map((expense, index) =>{
                                expense.userId = id;
                                return (<ExpenseCard showIcon={true} deleteExpense={deleteExpense} expense={expense} index={index} />);
                            })}
                        </div>}
                    </div>
                </div>
            }
        </div>
    );
}

export default Expense;