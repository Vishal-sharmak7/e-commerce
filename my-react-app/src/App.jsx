import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Shop from './components/Shop'
import { Toaster } from "react-hot-toast";
import Profile from './components/Profile'
import TrackOrders from './components/TrackOrders'
import ContactUs from './pages/ContactUs'
import Support from './pages/Support'
import Seasonal from './pages/Seasonal'
import ProductDetails from './components/ProductDetails'
import ScrollToTop from './components/ScrollToTop'
import Cart from './components/Cart'
import Men from './components/Men'
import Women from './components/Women'
import Accessories from './components/Accessories'
import Trending from './components/Trending'

function App() {
  

  return (
    <>
       <Toaster position="top-center" />
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/concerts" element={<h1>Concerts</h1>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<TrackOrders />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/seasonal" element={<Seasonal />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shop/men" element={<Men />} />
        <Route path="/shop/women" element={<Women />} />
        <Route path="/shop/accessories" element={<Accessories />} />
        <Route path="/tranding" element={<Trending />} />


      </Routes>
      <Footer/>
      
    </>
  )
}

export default App
