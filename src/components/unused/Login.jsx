import axios from 'axios';
import React, { useState } from 'react'



const Login = () => {

    const handleSubmit = async (e) => {

        e.preventDefault();


        const axiosInstance = axios.create({
            baseURL: 'http://127.0.0.1:8000/',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log('cek', email, password)

        const response = await axiosInstance.post("/api/login", { email: "haz@chels.com", password: "properchels" })
        if (response.status == 200) {
            console.log(response.data.token)
        }
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <form className='flex flex-col gap-2 justify-center items-center' onSubmit={handleSubmit}>

                <div className=''>
                    <label htmlFor='email'>Email</label>
                    <input
                        className='border border-blue-200'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </div>


                <div>
                    <label htmlFor='email'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button>Login</button>
                </div>

            </form>
        </div >
    )
}

export default Login