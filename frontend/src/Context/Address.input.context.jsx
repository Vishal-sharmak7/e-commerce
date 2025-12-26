import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const addressInputContext = createContext();

const AddressProviderInput = ({ children }) => {
  const userId = localStorage.getItem("userId");

  const [formData, setFormData] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    
    const addressData = {
      userId,
      ...formData,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_URL}address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Address submitted successfully!");
        setFormData({
          houseNo: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
        });
        // Optional: refresh data
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <addressInputContext.Provider
      value={{ formData, setFormData, handleChange, handleSubmit }}
    >
      {children}
    </addressInputContext.Provider>
  );
};

export default AddressProviderInput;
