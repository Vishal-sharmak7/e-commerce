import React from "react";

const Trending = () => {
  const trends = [
    {
      id: 1,
      title: "Street Core",
      subtitle: "Oversized • Urban • Raw",
      image:
        "https://image.made-in-china.com/202f0j00bFfWtTwBfekS/in-Stock-Printing-Mens-T-Shirt-Street-Hip-Hop-Graffiti-Short-Sleeve-Fashion-Tee-Shirts-for-Men-Stylish-2022-T-Shirt.webp",
    },
    {
      id: 2,
      title: "Minimal Luxe",
      subtitle: "Clean • Neutral • Sharp",
      image:
        "https://cupidclothings.com/cdn/shop/files/1_bb07ee0d-8054-4ce2-9bd2-ea1b4620fba8.jpg?v=1724155348",
    },
    {
      id: 3,
      title: "Dark Academia",
      subtitle: "Moody • Layered • Vintage",
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    },
    {
      id: 4,
      title: "Gen-Z Sport",
      subtitle: "Bold • Athletic • Loud",
      image:
        "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
    },
  ];

  return (
    <section className="py-28 px-6 sm:px-10 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400 block mb-3">
            What’s Hot Right Now
          </span>
          <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
            Trending <br />
            <span className="text-gray-400">Now</span>
          </h1>
        </div>

        {/* 🔥 TREND GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {trends.map((trend) => (
            <div
              key={trend.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-black cursor-pointer"
            >
              {/* Image */}
              <img
                src={trend.image}
                alt={trend.title}
                className="h-full w-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

              {/* Text */}
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-2xl font-black uppercase tracking-tight">
                  {trend.title}
                </h3>
                <p className="text-white/70 text-xs uppercase tracking-widest mt-1">
                  {trend.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔥 FOOT NOTE */}
        <p className="mt-20 text-center text-xs uppercase tracking-[0.3em] text-gray-400">
          Inspired by global culture
        </p>

      </div>
    </section>
  );
};

export default Trending;
