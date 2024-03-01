import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/useAuth';


const Login = () => {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth();

  // panggil api login
  const onSubmit = async (data) => {
    await login({ username:data.email });
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
            className='w-full max-w-xs'
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
          />
          {/* <div className="label">
          <span className="label-text-alt">Bottom Left label</span>
        </div> */}
        </label>


        <button type='submit' className='mt-10 w-full btn btn-primary'>
          Login
        </button>


      </form>
    </div>
  )
}

export default Login