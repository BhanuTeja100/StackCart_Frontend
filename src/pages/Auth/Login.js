import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";
import { useAuth } from '../../context/auth';
import API_BASE from '../../hooks/apiUrl';


const Login = () => {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // form function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(API_BASE + "/api/v1/auth/login", { email, password });

            if (res && res.data.success) {
                toast.success(res.data.message);

                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data));

                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }

    }

    return (
        <Layout title={"Login - StackCart"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login Form</h4>


                    <div className="mb-3">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter your email'
                            className="form-control"
                            id="exampleInputPassword1"
                            aria-describedby="emailHelp" />
                    </ div>



                    <div className="mb-3">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='Enter your password'
                            className="form-control"
                        />
                    </div>


                    <div className="mb-3">
                        <button type="button" className="btn btn-primary"
                        onClick={() => { navigate('/forgot-password') }}>
                        Forgot Password
                    </button>
                    </div>


                    

                    <button type="submit" className="btn btn-primary">
                        LOGIN
                    </button>
                </form>

            </div>

        </Layout>
    )
}

export default Login