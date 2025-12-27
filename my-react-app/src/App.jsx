import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import Shop from './components/Shop'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/concerts" element={<h1>Concerts</h1>} />
        <Route path="/cart" element={<h1>Cart</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
      <Footer/>
      
    </>
  )
}

export default App
