import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import "../../styles/AuthStyles.css";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  // form function 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer
      });

      if (res && res.data.success) {
        toast.success(res.data.message);

        navigate('/login');
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
    <Layout title={"Register - StackCart"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className='title'>Register Form</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='Enter your Name'
              className="form-control" aria-describedby="emailHelp" />
          </ div>

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

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder='Enter your phone number'
              className="form-control"
              aria-describedby="emailHelp" />
          </ div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder='Enter your address'
              className="form-control"
              aria-describedby="emailHelp" />
          </ div>

          <div className="mb-3">

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
              placeholder="What is your first school name"
              className="form-control"
              aria-describedby="emailHelp" />
          </ div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>

        </form>

      </div>

    </Layout>
  )
}

export default Register