import { useMutation } from "@apollo/client/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {  SIGN_UP } from "../graphql/mutation/user.mutation";
import toast from 'react-hot-toast'
const SignUp = () => {
  
    const [signUpData,setSignUpData]=useState({
        username :"",
        name:"",
        password:"",
        gender:"",
})
const [signup,{loading,error}]=useMutation(SIGN_UP);

const handleChange=(e)=>{
    const {name,value}=e.target;
    setSignUpData((prev)=>({...prev,[name]:value}))
}
const handleSumit=async (e)=>{
     e.preventDefault();
     try {
      await signup({
        variables:{
          input:signUpData
        }
      })
       setSignUpData({
        username :"",
        name:"",
        password:"",
        gender:"",
     })
     toast.success('cograt your acount created successfully')
     } catch (error) {
      console.log(error)
      toast.error(error)
     }
    

}
  return (
    <>
      <div className="flex w-full  h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-2xs">
          <form onSubmit={handleSumit}  className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm/6 font-medium text-gray-100"
              >
                fullName
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={signUpData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-100"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={signUpData.username}
                   onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-100"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                   onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flext  items-center space-x-2 pb-3">
                <input type="radio" id="male" name="gender"  value='male' checked={signUpData.gender === 'male'}
                onChange={handleChange}/>
                <label className="text-white " htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female"  checked={signUpData.gender === 'female'}
                onChange={handleChange} />
                <label className="text-white"  htmlFor="female">Female</label>
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Don't have an acount?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
