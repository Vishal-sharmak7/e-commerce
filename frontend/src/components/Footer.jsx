import React from 'react'

import { FaYoutube, FaTwitter, FaFacebook, FaSoundcloud } from "react-icons/fa";

const Footer = () => {
  return (
    <>
    <footer className=" text-white py-6 ">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          {/* Left: Copyright */}
          <div className="text-center md:text-left text-sm text-black">
            © 2025 <span className="font-semibold">Seedhe Maut</span> |
            All rights reserved.
          </div>

          {/* Right: Socials */}
          <div className="flex space-x-4 mr-6 text-black">
            <a
              href="https://www.youtube.com/channel/UCV9Mdim99sdyd56EqKJ52fg"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <FaYoutube size={24} />
            </a>
            <a
              href="https://soundcloud.com/azadirecords"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-600 transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <FaSoundcloud size={24} />
            </a>

            <a
              href="https://x.com/seedhemaut"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <FaTwitter size={24} />
            </a>
            
            <a
              href="https://www.facebook.com/SeedheMaut/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-800 transition delay-10 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              <FaFacebook size={24} />
            </a>

            
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer