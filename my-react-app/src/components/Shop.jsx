import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Shop = ({ limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8520/api/v1/merch");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching merch:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center font-black italic text-2xl tracking-tighter text-gray-400">
        FETCHING LATEST DROPS...
      </div>
    );
  }

  // ✅ Apply limit only if provided
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-24 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4">
          <div className="text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 block mb-2">
              Limited Edition
            </span>
            <h2 className="text-5xl md:text-6xl font-black leading-[0.85] tracking-tighter uppercase italic">
              Featured <br /> <span className="text-gray-400">Merch</span>
            </h2>
          </div>

          {limit && (
            <Link to="/shop" className="px-6 py-3 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              View All Collection
            </Link>
          )}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((item) => (
            <div key={item._id} className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-white">
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default Shop;
