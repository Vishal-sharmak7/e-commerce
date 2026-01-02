import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Seasonal = () => {
  return (
    <section className="min-h-screen bg-[#f5f5f5] pt-32 pb-24">
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl bg-black text-white p-14 md:p-20"
        >
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
            Seasonal Collection
          </h1>
          <p className="max-w-xl text-gray-300 text-sm md:text-base mb-8">
            Discover exclusive seasonal drops designed for comfort, style,
            and modern streetwear culture. Limited editions crafted for
            every season.
          </p>
          <Link to="/shop" className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:scale-105 transition">
            Explore Collection
          </Link>

          <span className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      </div>

      {/* SEASON GRID */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <h2 className="text-3xl font-black mb-10">Shop by Season</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: "Winter Wear", img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f" },
            { title: "Summer Essentials", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
            { title: "Spring Styles", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
            { title: "Autumn Fits", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  Limited seasonal drops
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OFFER STRIP */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="rounded-3xl bg-gradient-to-r from-black to-gray-800 text-white p-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-bold">
            Seasonal Sale – Flat 30% Off
          </h3>
          <Link to="/shop" className="bg-white text-black px-8 py-3 rounded-full text-sm font-semibold hover:opacity-90">
            Shop Now
          </Link>
        </div>
      </div>

      {/* WHY SEASONAL */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-10">
          Why Our Seasonal Collection?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Premium Fabric",
              desc: "High-quality materials designed for seasonal comfort.",
            },
            {
              title: "Limited Edition",
              desc: "Exclusive designs you won’t find again.",
            },
            {
              title: "Streetwear Fit",
              desc: "Modern silhouettes crafted for everyday wear.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
            >
              <h4 className="font-bold text-lg mb-3">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Seasonal;
