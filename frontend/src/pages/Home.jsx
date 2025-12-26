import React, { useEffect, useState } from "react";
import pose from "../assets/pose.png";
import Button from "../components/Button";
import MarqueeComponent from "../components/MarqueeComponent";
import uk from "../assets/uk.png"
import Music from "../components/Music";
import vid from "../assets/seedhe car sen.gif"


const Home = () => {
  const [loggedInUser, setloggedInUser] = useState("")

  useEffect(() => {
    setloggedInUser(localStorage.getItem("loggedInUser"))
  }, [])
  



  return (
    <>
    <div className=" flex text-6xl font-extrabold text-red-600 text-center justify-center align-center animate-bounce">
      <h1><span className="">WELCOME</span> {loggedInUser}</h1>
    </div>
      <div>
  <img src={uk} alt="" className="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[600px]" />
</div>


  


<div className="text-center">
  <h2 className="font-bold text-3xl sm:text-5xl mt-10">LATEST RELEASE</h2>
</div>

<div className="grid grid-cols-1 sm:grid-cols-5 gap-4 m-5 sm:m-10 p-5 sm:p-15">
  <div className="col-span-1 sm:col-span-3 text-center order-2 sm:order-1">
    <h2 className="font-bold text-3xl sm:text-5xl mt-10">LUNCH BREAK</h2>
    <p>
      <i>Aug 19, 2023</i>
    </p>
    <p className="font-semibold mt-5 text-sm sm:text-base">
      Whether it’s creating a universe for their thriving ‘nation’ with
      their intricate story lines, or singles that effortlessly hit the
      charts, Seedhe Maut has undeniably pioneered contemporary Indian
      hip-hop. With ‘Lunch Break’, their third mixtape they introduce a
      cutting-edge soundscape, which flows through multiple genres but
      with the Seedhe Maut spin to it. They continue to question, rebel
      and mostly important remain unhinged, speaking to a generation that
      is burdened with a world that refuses to change.
    </p>
    <div className="mt-10">
      <a href="https://lnk.to/Lunchbreak" target="blank">
        <Button />
      </a>
    </div>
  </div>

  <div className="col-span-1 sm:col-span-2 mt-5 sm:mt-0 order-1 sm:order-2">
    <img src={pose} alt="" className="w-full h-auto rounded-lg" />
  </div>
</div>

<div className="w-full h-[40vh] relative overflow-hidden mt-12 max-h-[150px] sm:max-h-[200px] md:max-h-[600px] mb-10">
  <img src={vid} alt="" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent flex items-center justify-center ">
    <div className="text-white text-4xl sm:text-6xl font-bold text-center px-6">
      UK Concerts
      <br />
      <a href="/concerts">
        <button className="bg-cyan-50 text-red-600 w-64 sm:w-80 rounded-2xl hover:bg-red-500 hover:text-amber-50 hover:scale-90 transition-transform h-16 sm:h-20 text-lg sm:text-2xl mt-5">
          Checkout
        </button>
      </a>
    </div>
  </div>
</div>


      <MarqueeComponent />
      <Music/>
      
    </>
  );
};

export default Home;
