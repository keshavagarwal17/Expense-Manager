import './Login.scss';
import { useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Message } from 'semantic-ui-react'
import Loader from '../../../Components/Loader/Loader';
import axios from 'axios';
import Navbar from '../../../Components/Navbar/Navbar';

const Login = ()=>{
    const [userInfo, setInfo] = useState({email: "", password: ""})
    const [errMessage, setError] = useState(null)
    const [loading,setLoading] = useState(true);
    const [saving,setSaving] = useState(false);
    const history = useHistory();
    const fetchUser = async()=>{
        let res = await axios.get('http://localhost:5000/auth/getUser');
        if(res.data.admin){
            history.push("/admin/dashboard")
        }
        if(res.data.user){
            history.push("/dashboard")
        }
        setLoading(false);
    }
    useEffect(()=>{
        fetchUser();
    },[])
    const handleChange = (e) => {
        setInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setSaving(true);
        let res = await axios.post('http://localhost:5000/admin/login',userInfo);
        setSaving(false);
        if(res.data.err){
            setError(res.data.err)
        }else{
            history.push("/admin/dashboard")
        }
    }
    const formElement = [
        { type: "email", name: "email", id: "email", label: "Email" },
        { type: "password", name: "password", id: "password", label: "Password" }
    ]
    const renderFormElement = (form, index) => {
        return (
            <div className="input-box" key={index}>
                <input type={form.type} name={form.name} id={form.id} onChange={handleChange} required />
                <label htmlFor={form.id}>{form.label}</label>
            </div>
        );
    }
    return(
        <div>
            {loading && <Loader />}
            {!loading && 
                <div>
                    <Navbar />
                    <form className='login-form'>
                        <h3>Admin Login</h3>
                        {formElement.map((element, index) =>
                            renderFormElement(element, index)
                        )}
                        <button type="Submit" onClick={handleSubmit} className='login-btn'>{saving?"Loading...":"Login"}</button>
                        {errMessage && <Message error header="Oops!!" content={errMessage} />}
                    </form>
                </div>
            }
        </div>
    );
}

export default Login;