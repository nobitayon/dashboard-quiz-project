import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { login, setInfoLogin } = useAuth();


  const navigate = useNavigate()

  // panggil api login
  const onSubmit = async (data) => {
    const { status, body } = await login({ username: data.email, password: data.password })

    if (status === 200) {
      if (body.role != "admin") {
        toast.error("tidak diizinkan", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        setInfoLogin({ user: data.email, token: body.token, role: body.role })
        navigate("/dashboard")
      }

    } else {
      toast.error(body.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }



  }

  return (
    <div className='flex justify-center items-center w-full h-screen'>



      <form onSubmit={handleSubmit(onSubmit)}>

        {/* email */}
        <label className='form-control w-full max-w-xs'>
          <div className='label'>
            <span className='label-text'>Email</span>
          </div>
          <input
            id="email"
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
            placeholder='email'
            className="input input-bordered w-full max-w-xs"
            value={"admin@admin.com"}
          />
        </label>


        {/* password */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true, maxLength: 20 })}
            className="input input-bordered w-full max-w-xs"
            value={"admin123"}
          />

        </label>


        <button type='submit' className='mt-10 w-full btn btn-primary'>
          Login
        </button>


      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  )
}

export default Login