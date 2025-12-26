import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const userId = localStorage.getItem("userId");

  const fetchAddress = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_URL}address/${userId}`);
      setAddress(res.data.address);
    } catch (err) {
      console.error("Error fetching address:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchAddress();
  }, [userId]);

  return (
    <AddressContext.Provider value={{ address, setAddress, fetchAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
