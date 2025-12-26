import React from "react";
import booking from "../assets/booking.jpg";

const Booking = () => {
  return (
    <>
      <div className="font-bold flex items-center justify-center text-4xl md:text-6xl p-4">
        <h1>BOOKING</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-6 md:p-16">
        {/* Left text section */}
        <div className="md:col-span-3">
          <h3 className="font-semibold text-xl md:text-2xl mb-4">Booking & Live Show Info</h3>

          <p className="mt-4 text-sm md:text-base">
            Seedhe Maut comprises of Encore ABJ & Calm, the dynamic duo behind
            one of Asia’s most exciting new artists. The travel party for live
            activations can range from 4 to 8 people depending on the nature of
            the event. Travel party travels from Delhi and Mumbai.
          </p>
          <p className="mt-6 text-sm md:text-base">
            Seedhe Maut are available for club shows, festivals, live events,
            corporate and private functions, as well as partnering with brands
            in order to create unique and authentic collaborative campaigns that
            showcase their remarkable creative talents. Please get in touch via
            the details below for more information.
          </p>
          <p className="mt-6 text-sm md:text-base">
            Email:{" "}
            <a
              className="text-red-600 underline"
              href="mailto:Mo@dl91era.com"
            >
              Bookaro.com
            </a>
          </p>

          <i className="font-light block mt-4 text-sm">
            If you have any queries, please email the above details.
          </i>
        </div>

        {/* Right image section */}
        <div className="md:col-span-2 flex justify-center items-center">
          <img className="rounded-2xl w-full h-auto object-cover" src={booking} alt="Booking" />
        </div>
      </div>
    </>
  );
};

export default Booking;
