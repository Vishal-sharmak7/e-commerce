import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import uk from "../assets/uk.png";
import { HiArrowSmallDown } from "react-icons/hi2";

const Event = () => {
  const [concerts, setConcerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_REACT_URL}`)
      .then((res) => {
        setConcerts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  return (
    <>
      <div className="p-6">
        <h1 className="text-center font-bold text-5xl uppercase mb-10">
          Upcoming Concerts
        </h1>

        <div className="flex flex-col items-center justify-center gap-6 px-4">
          <img
            src={uk}
            alt="Concert Location"
            className="h-64 w-auto md:h-80 object-cover rounded-lg"
          />

          <a
            href="#concerts"
            className="mt-6 hover:text-red-600 transition animate-bounce"
          >
            <HiArrowSmallDown size={40} className="text-black" />
          </a>
        </div>

        {/* Concert Cards */}
        <div id="concerts" className="flex flex-wrap justify-center gap-8 mt-8">
          {concerts.map((concert, idx) => (
            <div
              key={idx}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-5 flex flex-col items-center">
                <img
                  src={concert.image}
                  alt={concert.name}
                  className="h-80 w-80 object-cover mb-4 rounded"
                />

                <h5 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                  {concert.name}
                </h5>

                <p className="mb-2 font-normal text-gray-700">
                  Date: {concert.date}
                </p>

                <p className="mb-4 font-normal text-gray-700">
                  Price: {concert.price}
                </p>

                <button
                  onClick={() => navigate("/booknow", { state: { concert } })}
                  className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Event;

