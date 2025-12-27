import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-3xl font-black tracking-tighter mb-6">VEXUS</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Redefining the digital shopping experience through avant-garde design and premium curation.
            </p>
            <div className="flex gap-4">
              {/* Simple Social Icons */}
              <div className="h-8 w-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">IG</div>
              <div className="h-8 w-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">X</div>
              <div className="h-8 w-8 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">FB</div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Collections</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Men's Essentials</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Women's Premium</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Seasonal Drops</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Shipping Policy</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Track Order</Link></li>
              <li><Link to="/" className="hover:text-gray-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Join the club for early access.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-transparent border-b border-gray-700 py-2 focus:outline-none focus:border-white transition-colors text-sm"
              />
              <button className="absolute right-0 bottom-2 text-xs font-bold uppercase tracking-tighter hover:italic">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Large Decorative Text */}
        <div className="overflow-hidden mb-12 select-none pointer-events-none">
          <h1 className="text-[12vw] max-w-screen font-black leading-none tracking-tighter text-white/[0.06] whitespace-nowrap">
            VEXUS STUDIO 
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">
            © 2025 VEXUS Studio. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-gray-500 uppercase tracking-widest">
            <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;