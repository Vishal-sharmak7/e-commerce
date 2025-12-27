import { Link } from "react-router-dom";
import OtpLoginModal from "./OtpLoginModal";
import { useState } from "react";

const Header = () => {
    const [open, setOpen] = useState(false);

  return (
    <>
    {/* Added a slight padding-top to the wrapper so it doesn't touch the very top edge */}
    <header className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl">
      <nav className="flex items-center justify-between 
                      /* 1. Rounded Edges */
                      rounded-full 
                      /* 2. Glassmorphism: Semi-transparent background + Backdrop Blur */
                      bg-white/50 backdrop-blur-xl 
                      /* 3. Border & Shadow for depth */
                      border border-black/40 
                      px-8 py-4">

        {/* Left Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-800">
          <Link  to="/shop" className="hover:text-black transition-colors">Shop</Link>
          <Link  to="/" className="hover:text-black transition-colors">Men</Link>
          <Link  to="/" className="hover:text-black transition-colors">Women</Link>
          <Link  to="/" className="hover:text-black transition-colors">Trending</Link>
        </div>

        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter">
          <Link to="/">VEXUS</Link>
        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-5 text-sm font-medium">
          <Link target="_blank" to="/" className="hidden md:block hover:text-black">Seasonal</Link>
          <Link target="_blank" to="/" className="hidden md:block hover:text-black">Accessories</Link>

          <button onClick={() => setOpen(true)}  className="rounded-full bg-black px-5 py-2.5 text-white text-xs font-semibold hover:bg-gray-800 transition-all">
            Sign In / Up
          </button>

          <div className="relative h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <span className="text-lg">🛒</span>
            {/* Optional: Cart Badge */}
            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </div>
        </div>
      </nav>
    </header>
     <OtpLoginModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;