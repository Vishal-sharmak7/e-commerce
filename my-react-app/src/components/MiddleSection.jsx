const MiddleSection = () => {
  return (
    <section className="relative w-full py-34 px-6 overflow-hidden bg-[#fafafa] ">
      
      {/* 1. Large Background Typography */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none">
        <h2 className="text-[15vw] font-black leading-none text-gray-200/80 tracking-tighter uppercase italic">
          Workout
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 items-center gap-4">
        
        {/* Left Column: Small Image + Description */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6 pt-20">
          <div className="aspect-[6/5] rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://flagnorfail.com/cdn/shop/files/001-hood_0001_DSC01548.jpg?v=1755118741" 
              alt="Gear" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 leading-relaxed max-w-[180px]">
            Performance-driven gear for men—built for summer heat and winter cold.
          </p>
        </div>

        {/* Center Column: Large Main Image */}
        <div className="col-span-12 md:col-span-6 flex justify-center">
          <div className="w-full aspect-[6/9] md:w-[50%] rounded-[3rem] overflow-hidden shadow-2xl transform md:-translate-y-10">
            <img 
              src="https://www.thesagacity.in/cdn/shop/files/edit-2_a0b25f47-a937-47cf-858e-1cda0ef16042.jpg?v=1761489782&width=600" 
              alt="Main Model" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column: Small Image + Description */}
        <div className="col-span-12 md:col-span-3 flex flex-col gap-6 items-end text-right self-start">
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 leading-relaxed max-w-[200px]">
            Stay warm, stay fit. Our winter workout wear blends insulation with flexibility.
          </p>
          <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-2xl">
            <img 
              src="https://cdn.shopify.com/s/files/1/0219/7173/0504/files/white-fox-stay-lifted-cropped-hoodie-wide-leg-pants-grey-02.04.25-7_612x.jpg?v=1744240726" 
              alt="Winter Fit" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default MiddleSection;