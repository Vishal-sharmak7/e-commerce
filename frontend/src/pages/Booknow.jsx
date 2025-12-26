import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 

const Booknow = () => {
  const [book, setbook] = useState({
    event: "",
    name: "",
    age: "",
    email: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { concert } = location.state || {};

  const handleChange = (e) => {
    setbook({ ...book, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    if (concert) {
      setbook((prevBook) => ({
        ...prevBook,
        event: concert.name,
      }));
    }
  }, [concert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_URL}booking`, 
        book 
      );
      alert("Booking successful!");
      console.log(res.data);
      setbook({
        event: "",
        name: "",
        age: "",
        email: "",
      });
    } catch (err) {
      alert("Booking failed!");
      console.error(err);
    }
  };

  if (!concert) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-4">No Concert Selected</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col md:flex-row items-center justify-center">
  <div className="mb-6 md:mb-0">
    <h1 className="text-4xl font-bold mb-6">{concert.name}</h1>
    <img
      src={concert.image}
      alt={concert.name}
      className="w-full md:w-96 h-auto object-cover mb-6 rounded-lg"
    />
  </div>

  <div className="w-full md:w-1/2 text-center md:text-left m-10 ">
    <p className="text-lg mb-2 text-center">Date: {concert.date}</p>
    <p className="text-lg mb-2 text-center">
      Price: <b>{concert.price}</b>
    </p>

    <form onSubmit={handleSubmit} className="space-y-4 text-center">
      <div>
        <input
          type="text"
          name="event"
          className="font-serif text-red-600 text-center border-2 rounded-xl w-full p-2"
          value={book.event}
          onChange={handleChange}
          readOnly
        />
        <p className="mt-2">Name</p>
        <input
          className="border-2 rounded-xl text-center h-10 w-full p-2"
          type="text"
          name="name"
          placeholder="Enter your Full Name"
          value={book.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <p>Age</p>
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          className="border-2 rounded-xl text-center h-10 w-full p-2"
          onChange={handleChange}
          value={book.age}
          required
        />
      </div>

      <div>
        <p>Email</p>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border-2 rounded-xl text-center h-10 w-full p-2"
          onChange={handleChange}
          value={book.email}
          required
        />
      </div>

      <div className="flex gap-4 mt-8 justify-center md:justify-start">
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white transition ease-in rounded-md hover:scale-95"
        >
          Confirm Booking
        </button>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white transition ease-in rounded-md hover:scale-95"
        >
          Go Back
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default Booknow;
