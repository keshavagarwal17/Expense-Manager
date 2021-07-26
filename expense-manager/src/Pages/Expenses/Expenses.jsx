import './Expenses.scss';
import Navbar from '../../Components/Navbar/NavbarAuth';
import {Select,Icon,Popup,Message} from 'semantic-ui-react';
import { useHistory,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loader from '../../Components/Loader/Loader';
import LoadingData from '../../Components/LoadingData/LoadingData'
import axios from 'axios';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [fetchingData,setFetch] = useState(false);
    const [data, setData] = useState([])
    const [selectedCategory,setCategory] = useState("All")
    const history = useHistory();

    const fetchData = async(category)=>{
        setFetch(true);
        let res = await axios.get(`https://expense-manager01.herokuapp.com/expense/show-expense/${category}`);
        setData(res.data.expenses)
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
        await fetchData("All")
    }
    useEffect(() => {
        fetchUser();
    }, [])
    const categoryOptions = [
        { key: 'All', value: 'All', text: 'All' },
        { key: 'Home', value: 'Home', text: 'Home' },
        { key: 'Food', value: 'Food', text: 'Food' },
        { key: 'Fuel', value: 'Fuel', text: 'Fuel' },
        { key: 'Shopping', value: 'Shopping', text: 'Shopping' },
        { key: 'Others', value: 'Others', text: 'Others' }
    ]
    const handleChange = (e, { value })=>{
        setCategory(value);
        fetchData(value);
    }
    const deleteExpense = async(id)=>{
        setData(data.filter((exp)=>exp.id!==id))
        await axios.delete(`https://expense-manager01.herokuapp.com/expense/delete/${id}`)
    }
    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <div className="expense-page">
                        <h3>You Can See All of Your Expenses Here</h3>
                        <div className="cat-btn">
                            <Select onChange={handleChange} value={selectedCategory} placeholder='Select your country' options={categoryOptions} />
                            <Popup
                                content="Add Expense"
                                trigger={
                                    <Link to="/add-expense"><Icon name="add"></Icon></Link>
                                }
                            />
                        </div>
                        {fetchingData && <LoadingData />}
                        {!fetchingData && !data.length && 
                            <Message info>
                                <Message.Header>You Have Not Added Any Expense {selectedCategory==="All"?"":`In ${selectedCategory} Category`}.</Message.Header>
                                <p>Click On + Button in right side to add expense.</p>
                            </Message>
                        }
                        {!fetchingData && (data.length>0) && data.map((expense, index) => <ExpenseCard showIcon={true} deleteExpense={deleteExpense} expense={expense} index={index} />)}
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;