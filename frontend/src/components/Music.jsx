

import React from 'react'
import vid from "../assets/concert.gif"
import { useNavigate } from 'react-router-dom'


const Music = () => {
 const navigate =  useNavigate()

 const handlclick = ()=>{
  navigate("/songs")
 }

  return (
    <>
  
  <div className="w-full h-[70vh] relative overflow-hidden mt-12">
  <img src={vid} alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent flex items-center justify-center">
    <div className="text-white text-6xl sm:text-8xl font-bold text-center px-6">
      Explore Songs
      <br />
      
        <button onClick={handlclick} className="bg-cyan-50 text-red-600 w-72 sm:w-100 rounded-2xl hover:bg-red-500 hover:text-amber-50 hover:scale-90 transition-transform h-16 sm:h-25 text-xl sm:text-2xl">
          Explore It
        </button>
      
    </div>
  </div>
</div>



    </>
  )
}

export default Music