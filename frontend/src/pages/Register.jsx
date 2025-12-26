import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formdata, setformdata] = useState({
    name: "fghhhhhh",
    email: "xyz@gmail.com",
    password: "123456",
  });

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyregisterInfo = { ...formdata };
    copyregisterInfo[name] = value;
    setformdata(copyregisterInfo);
  };
  console.log(formdata);

  const handleOnClick = async (e) => {
    e.preventDefault();

    const { name, email, password } = formdata;
    if (!name || !email || !password) {
      return toast.error("enter correct Name , email, and password");
    }

    try {
      const url = `${import.meta.env.VITE_REACT_URL}register`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const result = await response.json();
      const { success, message , error } = result;
      if (success) {
         toast.success(message);
        setTimeout(() => {
          navigate("/login");
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
      <div className="flex justify-center  items-center m-10">
        <form
          onSubmit={handleOnClick}
          className="bg-white p-8 rounded-2xl  shadow-xl/30 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name...."
              value={formdata.name}
              onChange={handleSubmit}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email."
              value={formdata.email}
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
              value={formdata.password}
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
            Already have an account{" "}
            <Link to="/login" className="text-blue-600 ml-3 underline">
              Login
            </Link>{" "}
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
