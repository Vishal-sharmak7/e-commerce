import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    
    email: "xyz@gmail.com",
    password: "123456",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyloginInfo = { ...loginInfo };
    copyloginInfo[name] = value;
    setloginInfo(copyloginInfo);
  };
  console.log(loginInfo);
  const handleOnClick = async (e) => {
    e.preventDefault();

    const {  email, password } = loginInfo;
    if ( !email || !password) {
      return toast.error("enter correct email, and password");
    }

    try {
      const url = `${import.meta.env.VITE_REACT_URL}login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message ,jwttoken , name ,_id, error } = result;
      if (success) {
         toast.success(message);
         localStorage.setItem('token', jwttoken)
         localStorage.setItem('loggedInUser', name)
         localStorage.setItem("userId", _id);
         
        setTimeout(() => {
          navigate("/");
        }, 2000);
        
      }else if(error){
             const details = error?.details[0].message;
             toast.error(details )
        }
        else if(!success){
          toast.error(message)
        }
    } catch (error) {
      return toast.error("enter correct Name , email, and password");
    }
  };

  return (
    <>
      <div className="flex justify-center  items-center m-20  ">
        <form
          onSubmit={handleOnClick}
          className="bg-white p-8 rounded-2xl  shadow-xl/30 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>

          

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email."
              value={loginInfo.email}
              onChange={handleSubmit}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password."
              value={loginInfo.password}
              onChange={handleSubmit}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Register
          </button>
          <p className="flex mt-4  justify-center">
            Don't have an account{" "}
            <Link to="/register" className="text-blue-600 ml-3 underline">
             Register
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login