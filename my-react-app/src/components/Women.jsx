import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Women = () => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenMerch = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/merch?type=female`
        );
        setMerch(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenMerch();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center font-black italic text-2xl tracking-tighter text-gray-400">
        FETCHING MEN COLLECTION...
      </div>
    );
  }

  if (merch.length === 0) {
    return (
      <div className="h-[40vh] flex items-center justify-center text-gray-500">
        No men products available
      </div>
    );
  }

  return (
    <section className="py-24 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">

        {/* ✅ HEADER (THIS WAS MISSING) */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-2">
            Men’s Collection
          </span>
          <h2 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter uppercase italic">
            Premium <br /> <span className="text-gray-400">Menswear</span>
          </h2>
        </div>

        {/* ✅ GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {merch.map((item) => (
            <Link to={`/product/${item._id}`} key={item._id}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-white cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] bg-white/80 backdrop-blur-xl rounded-[1.5rem] p-5 flex justify-between items-center shadow-xl">
                  <div>
                    <h3 className="text-[8px] font-black uppercase truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      ₹{item.price}
                    </p>
                  </div>
                  <div className="h-9 w-9 bg-black text-white rounded-xl flex items-center justify-center">
                    →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Women;
