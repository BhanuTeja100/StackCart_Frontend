import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";


const ForgotPassword = () => {

    
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    

    const navigate = useNavigate();
  
    // form function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/v1/auth/forgot-password", { 
            email,
            newPassword,
            answer
         });

            if (res && res.data.success) {
                toast.success(res.data.message);

                navigate("/login");
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
    <Layout title={'Forgot Password - StackCart'}>
        <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <h4 className='title'>RESET PASSWORD</h4>


                    <div className="mb-3">

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder='Enter your email'
                            className="form-control"
                            id="exampleInputPassword1"
                             />
                    </ div>

                    <div className="mb-3">

                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            placeholder='Enter your first school name'
                            className="form-control"
                            id="exampleInputPassword1"
                            />
                    </ div>



                    <div className="mb-3">

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            placeholder='Enter your password'
                            id="exampleInputPassword1"
                            className="form-control"
                        />
                    </div>


                   


                    

                    <button type="submit" className="btn btn-primary">
                        RESET
                    </button>
                </form>

            </div>
    </Layout>
  )
}

export default ForgotPassword