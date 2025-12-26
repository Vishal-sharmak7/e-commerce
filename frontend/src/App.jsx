import React from "react";
import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Event from "./pages/Event";
import Store from "./pages/Store";
import Song from "./pages/Song";
import Booknow from "./pages/Booknow";
import MerchBook from "./pages/MerchBook";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import notfound from "../src/assets/404.png"
import Cart from "./pages/Cart";

const App = () => {
  const token = localStorage.getItem("token");
  const NotFound = () => (
    <img src={notfound} className="flex justify-center items-center ml-130 bg-white h-135     " alt="" />
  );
  const Navigate = useNavigate();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/about" element={<About />} />
        <Route path="/concerts" element={<Event />} />
        <Route path="/store" element={<Store />} />
        
        <Route
          path="/songs"
          element={
            <ProtectedRoute>
              {" "}
              <Song />{" "}
            </ProtectedRoute>
          }
        />
        <Route path="/booknow" element={<Booknow />} />
        <Route
          path="/merchBook"
          element={
            <ProtectedRoute>
              {" "}
              <MerchBook />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              {" "}
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              {" "}
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="*"
          element={token ? <NotFound /> : <Navigate to="/login" replace />}
        />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      <Footer />
    </>
  );
};

export default App;
