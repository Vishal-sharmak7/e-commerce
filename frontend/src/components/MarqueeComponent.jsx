import React from "react";
import Marquee from "react-fast-marquee";
import img1 from "../assets/img1.jpeg"
import img2 from "../assets/img2.jpeg"
import img3 from "../assets/img3.jpeg"
import img4 from "../assets/img4.jpeg"
import img5 from "../assets/img5.jpeg"
import img6 from "../assets/img6.jpeg"


const MarqueeComponent = () => {
  return (
    <>
      <Marquee gradient >
        <div className="">
          <img className=" rounded-2xl w-80 h-120 mr-20 "src={img1} alt="" />
        </div>
        <div className="">
        <img className=" rounded-2xl w-80 h-120 mr-20 "src={img2} alt="" />
        </div>
        <div className="">
        <img className=" rounded-2xl w-80 h-120 mr-20 "src={img3} alt="" />
        </div>
        <div className="">
        <img className=" rounded-2xl w-80 h-120 mr-20 "src={img4} alt="" />
        </div> 
        <div className="">
        <img className=" rounded-2xl w-80 h-120 mr-20 "src={img5} alt="" />
        </div> 
        <div className="">
        <img className=" rounded-2xl w-80 h-120 mr-20 "src={img6} alt="" />
        </div> 
      </Marquee>
    </>
  );
};

export default MarqueeComponent;

