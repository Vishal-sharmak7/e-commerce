import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Shop from "./Shop";
import { FaLongArrowAltLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("_id");

    if (!userId) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/add`, {
        userId,
        productId: product._id,
        quantity: 1,
      });

      setQuantity(1);
      setInCart(true);

      toast.success("Added to cart");
      window.dispatchEvent(new Event("cart-change"));
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (newQty) => {
    const userId = localStorage.getItem("_id");

    if (newQty < 1) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/update`, {
        userId,
        productId: product._id,
        quantity: newQty,
      });

      setQuantity(newQty);
      window.dispatchEvent(new Event("cart-change"));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update quantity");
    }
  };
useEffect(() => {
  const checkCart = async () => {
    const userId = localStorage.getItem("_id");
    if (!userId || !product) return;

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`
      );

      const item = res.data.items.find(
        (i) => i.productId === product._id
      );

      if (item) {
        setInCart(true);
        setQuantity(item.quantity);
      }
    } catch (err) {
      console.log(err);
    }
  };

  checkCart();
}, [product]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center font-black">
        Loading Product...
      </div>
    );
  }

  if (!product) return null;

  return (
    <>
      <section className="pt-32 pb-24 px-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* 🔙 Back */}
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex items-center gap-2 text-sm font-bold hover:-translate-x-1 transition"
          >
            <FaLongArrowAltLeft /> Back
          </button>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Image */}
            <div className="rounded-[2.5rem] overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                Limited Edition
              </span>

              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
                {product.title}
              </h1>

              <p className="text-2xl font-semibold mb-6">₹{product.price}</p>

              <p className="text-gray-600 leading-relaxed mb-10">
                {product.description ||
                  "Premium streetwear crafted for modern style."}
              </p>

              {!inCart ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition cursor-pointer w-max"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-4 bg-black text-white px-6 py-3 rounded-full w-max">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    className="text-xl font-bold px-3"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg">{quantity}</span>

                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    className="text-xl font-bold px-3"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <Shop limit={4} />
    </>
  );
};

export default ProductDetails;
