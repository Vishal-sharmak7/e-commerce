import React, { useContext, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { LuPen } from "react-icons/lu";

import { useAddress } from "../../Context/AddressContext";
import { addressInputContext } from "../../Context/Address.input.context";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { address, setAddress } = useAddress();
  const { formData, setFormData, handleChange } = useContext(addressInputContext);
  const [isEditing, setIsEditing] = useState(false); // 🆕 toggle edit mode

  const loggedInUser = localStorage.getItem("loggedInUser");
  const token = localStorage.getItem("token")

  // update address
  const UpdateAddress = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_URL}address/update/${userId}`,
        formData,
         {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
      );
      toast.success("Address updated successfully");
      setAddress(res.data.address); 
      setIsEditing(false); 
    } catch (error) {
      toast.error("Error updating address");
      
      console.error(error);
    }
  };

  return (
    <>
      <div className="text-3xl flex flex-col items-center text-center mt-6">
        <div className="text-9xl text-red-500">
          <FaRegUserCircle />
        </div>
        <span className="mt-4 font-semibold">{loggedInUser}</span>
      </div>

      
      {!address || isEditing ? (
        <form
          onSubmit={UpdateAddress}
          className="bg-white rounded-2xl flex flex-col p-10 md:p-20 items-center justify-center mt-6 shadow-md w-full max-w-5xl mx-auto"
        >
          <div className="text-xl font-semibold mb-10 text-center">
            {isEditing ? "Update Address ✏️" : "Add Address 🏠"}
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
            <input
              type="text"
              name="houseNo"
              placeholder="House No"
              value={formData.houseNo}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              required
              className="p-2 border rounded-md w-full"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-2 text-xl rounded-full hover:bg-red-700 transition cursor-pointer"
            >
              {isEditing ? "Update" : "Submit"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="bg-gray-400 text-white px-6 py-2 text-xl rounded-full hover:bg-gray-500 transition cursor-pointer"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
      
        <div>
          <div className="text-center mt-6 p-4 rounded-md max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">📍 Delivery Address</h3>
            <p>
              {address.houseNo}, {address.street}
            </p>
            <p>
              {address.city}, {address.state} - {address.postalCode}
            </p>
            <p>{address.country}</p>
          </div>
          <div className="grid place-items-center text-center mt-6 p-4 rounded-md max-w-3xl mx-auto">
            <button
              className="bg-red-600 rounded-3xl w-10 h-10 flex items-center justify-center cursor-pointer"
              onClick={() => {
                setFormData(address); 
                setIsEditing(true); 
              }}
              type="button"
            >
              <LuPen className="text-white text-lg" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
