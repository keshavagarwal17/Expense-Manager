import './Register.scss';
import { Link, useHistory} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import Loader from '../../Components/Loader/Loader';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';

const Register = () => {
    const [userInfo, setInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" })
    const [loading, setLoading] = useState(true);
    const [errMessage, setError] = useState(null)
    const [saving, setSaving] = useState(false);
    const history = useHistory();
    const fetchUser = async () => {
        let res = await axios.get('http://localhost:5000/auth/getUser');
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
    const handleChange = (e) => {
        setInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        let res = await axios.post('http://localhost:5000/auth/register', userInfo);
        setSaving(false);
        if (res.data.err) {
            setError(res.data.err)
        } else {
            history.push("/dashboard")
        }
    }
    const formElement = [
        { type: "text", name: "name", id: "name", label: "Name" },
        { type: "email", name: "email", id: "email", label: "Email" },
        { type: "password", name: "password", id: "password", label: "Password" },
        { type: "password", name: "confirmPassword", id: "confirmPassword", label: "Confirm Password" }
    ]
    const renderFormElement = (form, index) => {
        return (
            <div className="input-box" key={index}>
                <input type={form.type} name={form.name} id={form.id} onChange={handleChange} required />
                <label htmlFor={form.id}>{form.label}</label>
            </div>
        );
    }
    return (
        <div>
            {loading && <Loader />}
            {!loading &&
                <div>
                    <Navbar />
                    <form className='Register-form'>
                        <h3>Register</h3>
                        {formElement.map((element, index) =>
                            renderFormElement(element, index)
                        )}
                        <button type="Submit" onClick={handleSubmit} className='Register-btn'>{saving ? "Registering..." : "Register"}</button>
                        <p className="bottom-line">Already have an account? <Link to="login">login </Link> here</p>
                        {errMessage && <Message error header="Oops!!" content={errMessage} />}
                    </form>
                </div>
            }
        </div>
    );
}

export default Register;