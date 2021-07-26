import './EditExpense.scss';
import Navbar from '../../Components/Navbar/NavbarAuth';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Form, Input, Dropdown,Message } from 'semantic-ui-react'
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
const EditExpense = (data) => {
    const [loading, setLoading] = useState(true);
    const [currencyOptions, setCurrency] = useState([])
    const [errMessage,setErrMessage] = useState(null);
    const [expenseInfo, setInfo] = useState({ id:"",dateAndTime: "", amount: "", currency: "", category: "Home", description: "" })
    const [processing,setProcessing] = useState(false);
    const history = useHistory();
    const fetchUser = async () => {
        let res = await axios.get('http://localhost:5000/auth/getUser');
        if (!(res.data.user)) {
            history.push("/auth/login")
        }
        if(res.data.admin){
            history.push("/admin/dashboard")
        }
        let note = await axios.get('https://openexchangerates.org/api/currencies.json')
        let currency = Object.keys(note.data);
        let array = [];
        currency.forEach((cur) => {
            array.push({ key: cur, value: cur, text: cur +" : " +note.data[cur] })
        })
        setCurrency(array);
        setLoading(false);
    }
    useEffect(() => {
        if(!data.location.data){
            history.push("/dashboard")
        }
        setInfo(data.location.data)
        fetchUser();
    }, [])

    const handleChange = (e) => {
        setInfo({
            ...expenseInfo,
            [e.target.name]: e.target.value
        })
    }

    const getCurrencyValue = (event, {value}) => {
        setInfo({
            ...expenseInfo,
            currency:value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setProcessing(true);
        let res = await axios.put("http://localhost:5000/expense/edit",expenseInfo);
        if(res.data.success){
            history.push('/expenses')
        }else{
            setErrMessage(res.data.error);
            setProcessing(false);
        }
    }

    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <Form error={!!errMessage}  className="add-expense">
                        <h2>Update Your Expense Here</h2>
                        <Form.Field required>
                            <label>Date & Time of Expense</label>
                            <Input name="dateAndTime" value={expenseInfo.dateAndTime} onChange={handleChange} fluid type="datetime-local" />
                        </Form.Field>
                        <Form.Field required>
                            <label>Expense Amount</label>
                            <Input name="amount" value={expenseInfo.amount} onChange={handleChange} fluid type="number" placeholder="Enter Expense Amount" />
                        </Form.Field>
                        <Form.Field required>
                            <label>Currency</label>
                            <Dropdown
                                name="currency"
                                placeholder='Select Currency'
                                fluid
                                search
                                selection
                                value={expenseInfo.currency}
                                options={currencyOptions}
                                onChange={getCurrencyValue}
                            />
                        </Form.Field>
                        <Form.Field name="category" value={expenseInfo.category} onChange={handleChange} required label='Category' control='select'>
                            <option value='Home'>Home</option>
                            <option value='Food'>Food</option>
                            <option value='Fuel'>Fuel</option>
                            <option value='Shopping'>Shopping</option>
                            <option value='Others'>Others</option>
                        </Form.Field>
                        <Form.Field value={expenseInfo.description} name="description" onChange={handleChange} label='Write Your Expense Description Here' control='textarea' rows='5' />
                        <button onClick={handleSubmit} type="submit" className="add-expense-btn">{processing?"Updating...":"Update Expense"}</button>
                        <Message error header="Oops!!" content={errMessage} />
                    </Form>
                </div>
            }
        </div>
    );
}

export default EditExpense;