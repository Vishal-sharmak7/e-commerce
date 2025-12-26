import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...formdata, [name]: value });
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    const { name, email, password } = formdata;
    if (!name || !email || !password) {
      return toast.error("Please enter name, email, and password.");
    }

    try {
      const url = `${import.meta.env.VITE_REACT_URL}register`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        toast.success(message);

     
        await greetMail(formdata);

        setTimeout(() => navigate("/login"), 2000);
      } else if (error) {
        const details = error?.details?.[0]?.message || "Registration failed";
        toast.error(details);
      } else {
        toast.error(message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network or server error during registration.");
    }
  };


  const greetMail = async ({ name, email }) => {
    try {
      const url = `${import.meta.env.VITE_REACT_URL}send-mail`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      await response.json();
    } catch (error) {
      toast.error("Failed to send greeting email.");
    }
  };

  return (
    <div className="flex justify-center items-center m-10">
      <form
        onSubmit={handleOnClick}
        className="bg-white p-8 rounded-2xl shadow-xl/30 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formdata.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formdata.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formdata.password}
            onChange={handleInputChange}
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

        <p className="flex mt-4 justify-center">
          Already have an account?
          <Link to="/login" className="text-blue-600 ml-2 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
