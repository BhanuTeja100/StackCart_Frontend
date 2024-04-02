import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import API_BASE from '../../hooks/apiUrl';

const Profile = () => {
    //context 
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
    }, [auth?.user])

    // form function 
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(API_BASE + "/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address
            });

            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('Profile Updated Successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }

    }
    return (
        <Layout title={"Your Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container">
                            <form onSubmit={handleSubmit}>
                                <h4 className='title'>USER PROFILE</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}

                                        placeholder='Enter your Name'
                                        className="form-control" aria-describedby="emailHelp" />
                                </ div>

                                <div className="mb-3">

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                        disabled
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

                                        placeholder='Enter your password'
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">

                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}

                                        placeholder='Enter your phone number'
                                        className="form-control"
                                        aria-describedby="emailHelp" />
                                </ div>

                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}

                                        placeholder='Enter your address'
                                        className="form-control"
                                        aria-describedby="emailHelp" />
                                </ div>

                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile