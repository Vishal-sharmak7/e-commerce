import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/file.png";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isLoggedIn = localStorage.getItem("token");

  // user loggout

  const loggout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    toast.success("User logout");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const [loggedInUser, setloggedInUser] = useState("");

  useEffect(() => {
    setloggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  return (
    <header className="  top-0 bg-white z-50">
      <div className="flex justify-between items-center p-4 md:p-6 max-w-7xl mx-auto">
        {/* Logo */}
        <img
          className="h-16 w-16 md:h-20 md:w-20 object-cover hover:scale-105"
          src={logo}
          alt="Logo"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-semibold text-lg">
          <Link
            to="/"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            Home
          </Link>
          <Link
            to="/songs"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            Songs
          </Link>
          <Link
            to="/concerts"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            Concerts
          </Link>
          <Link
            to="/store"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            Store
          </Link>
          <Link
            to="/about"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            About
          </Link>
          <Link
            to="/booking"
            className="hover:text-red-700 transition-transform duration-300 hover:scale-110"
          >
            Booking
          </Link>
        </nav>

        <div className="flex ">
          {!isLoggedIn ? (
            <>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="inline-flex ml-7 items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative ml-4 ">
              <div
                onClick={() => setMenuOpen(!menuOpen)}
                className="cursor-pointer text-red-700 font-semibold hover:scale-105 transition border border-rose-600 rounded-xl w-30 h-10 text-center justify-center items-center flex"
              >
               {loggedInUser}
              </div>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-50 transition-all ${
                  menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
              >
                <ul className="text-gray-700 text-sm py-2">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/orders"); // or any other route
                    }}
                  >
                    Order
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      loggout();
                    }}
                  >
                    Logout
                  </li>
                </ul>
                
              </div>
              
            </div>
          )}
            <div className="flex align-center justify-center items-center text-center ml-10">
              <Link to="/cart" className="hover:scale-125 transition ease-in text-2xl"><LuShoppingCart/></Link>
            </div>
        </div>
        

        
        

        {/* Mobile Menu Button */}
        <div className="md:hidden" onClick={toggleMenu}>
          <span className="text-3xl cursor-pointer transition-transform duration-300">
            {menuOpen ? "✖" : "☰"}
          </span>
        </div>
      </div>

      {/* Mobile Navigation with animation */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 p-4" : "max-h-0 p-0"
        } md:hidden bg-white shadow-md`}
      >
        <div className="flex flex-col gap-4 font-semibold text-lg">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            Home
          </Link>
          <Link
            to="/songs"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            Songs
          </Link>
          <Link
            to="/concerts"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            Concerts
          </Link>
          <Link
            to="/store"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            Store
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            About
          </Link>
          <Link
            to="/booking"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-700"
          >
            Booking
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;



