import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import OtpLoginModal from "./OtpLoginModal";
import { FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);


  useEffect(() => {
  const fetchCartCount = async () => {
    const userId = localStorage.getItem("_id");
    if (!userId) return setCartCount(0);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`
      );
      const data = await res.json();
      

      const totalQty =
        data.cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

      setCartCount(totalQty);
    } catch {
      setCartCount(0);
    }
  };

  fetchCartCount();

  // 🔄 Listen when cart updates
  window.addEventListener("cart-change", fetchCartCount);

  return () => {
    window.removeEventListener("cart-change", fetchCartCount);
  };
}, []);



  // Auto-check token
  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("token"));

    // Run on first load
    checkLogin();

    // Listen for login/logout update in same tab
    window.addEventListener("auth-change", checkLogin);

    return () => window.removeEventListener("auth-change", checkLogin);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSidebarLinkClick = () => {
    setSidebarOpen(false);
  };

  

  return (
    <>
      {/* Header */}
      <header className="fixed top-2 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-7xl">
        <nav className="flex items-center justify-between rounded-full bg-white/50 backdrop-blur-xl border border-black/40 px-8 py-4 shadow-lg">
          {/* Left */}
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-800">
            <Link to="/shop" className="hover:text-black">
              Shop
            </Link>
            <Link to="/shop/men" className="hover:text-black">
              Men
            </Link>
            <Link to="/shop/women" className="hover:text-black">
              Women
            </Link>
            <Link to="/tranding" className="hover:text-black">
              Trending
            </Link>
          </div>

          {/* Logo */}
          <div className="text-2xl font-black tracking-tighter">
            <Link to="/">VEXUS</Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5 text-sm font-medium">
            <Link to="/seasonal" className="hidden md:block hover:text-black">
              Seasonal
            </Link>
            <Link to="/shop/accessories" className="hidden md:block hover:text-black">
              Accessories
            </Link>

            {/* Sign In/Up (only when NOT logged in) */}
            {!isLoggedIn && (
              <button
                onClick={() => setOpen(true)}
                className="rounded-full bg-black px-5 py-2.5 text-white text-xs font-semibold hover:bg-gray-800 transition-all"
              >
                Sign In / Up
              </button>
            )}

            {/* Profile Icon (only when logged in) */}
            {isLoggedIn && (
              <FaUserCircle
                onClick={() => setSidebarOpen(true)}
                className="text-3xl cursor-pointer hover:text-black transition-all"
              />
            )}

            <div
              onClick={() => navigate("/cart")}
              className="relative h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
            >
              <span className="text-lg"><FaCartArrowDown /></span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Close */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              {/* Sidebar Content */}
              <h3 className="text-xl font-bold mb-6">Account</h3>

              {/* User info (optional show if token exists) */}
              {isLoggedIn && (
                <div className="bg-gray-100 p-3 rounded-lg mb-5">
                  <p className="text-center text-xl">
                    {localStorage.getItem("name")}
                  </p>
                  <p className="text-xs text-center font-semibold text-gray-600">
                    {localStorage.getItem("email")}
                  </p>
                </div>
              )}

              {/* Menu */}
              <ul className="flex flex-col gap-4 text-sm font-medium text-gray-700">
                <Link
                  to="/profile"
                  onClick={handleSidebarLinkClick}
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  {" "}
                  Profile
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/orders"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  {" "}
                  Track Orders
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/contact"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  {" "}
                  Contact Us
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/support"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  {" "}
                  Support
                </Link>

                <hr />

                <Link
                  onClick={handleSidebarLinkClick}
                  to="/shop"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300 "
                >
                  Shop
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/shop/men"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  Men
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/shop/women"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  Women
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/tranding"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  Trending
                </Link>

                <hr />

                <Link
                  onClick={handleSidebarLinkClick}
                  to="/seasonal"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  Seasonal
                </Link>
                <Link
                  onClick={handleSidebarLinkClick}
                  to="/shop/accessories"
                  className="hover:text-black hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  Accessories
                </Link>
              </ul>

              <div className="border-t border-gray-200 my-6"></div>

              {/* Logout */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    handleSidebarLinkClick();
                  }}
                  className="w-full bg-black text-white py-2 rounded-lg text-xs font-semibold hover:opacity-90 hover:translate-y-1 transition-all  ease-in-out duration-300  cursor-pointer"
                >
                  Logout
                </button>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <OtpLoginModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Header;
