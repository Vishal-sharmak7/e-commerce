import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative top-5   min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fafafa]">
      
      {/* Background Decorative Elements (The "Style") */}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 text-center">
        
        {/* Badge */}
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            New Collection 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8 italic">
          DEFINING <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900">
            THE EDGE.
          </span>
        </h1>

        {/* Subtext */}
        <p className="max-w-xl mx-auto text-gray-600 text-lg md:text-xl mb-10 leading-relaxed">
          VEXUS represents the intersection of high-street utility and avant-garde luxury. 
          Limited drops, infinite style.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/shop" className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all hover:pr-12">
            <span className="relative z-10 font-bold uppercase text-sm tracking-widest">Shop Collection</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
              →
            </span>
          </Link>
          
          <button className="px-8 py-4 border border-gray-900 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all">
            Lookbook
          </button>
        </div>

        {/* Stats / Features Bar */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-200 pt-10">
          {[
            { label: "Limited Edition", val: "001" },
            { label: "Global Shipping", val: "FAST" },
            { label: "Curated Style", val: "VEXUS" },
            { label: "Materials", val: "PREM" }
          ].map((item, i) => (
            <div key={i} className="text-left md:text-center">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</p>
              <p className="text-xl font-black">{item.val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;