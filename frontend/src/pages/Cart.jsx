import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // const userId = "6838a5b5964739875d07da77"; 

  const userId = localStorage.getItem("userId")

  const userremove = localStorage.removeItem("userId")
  

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_URL}cart/${userId}`
      );
      setCart(res.data);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    await axios.put(`${import.meta.env.VITE_REACT_URL}cart/update`, {
      userId,
      productId,
      quantity,
    });
    fetchCart();
  };

  const handleRemoveItem = async (productId) => {
    await axios.delete(`${import.meta.env.VITE_REACT_URL}cart/remove`, {
      data: { userId, productId },
    });
    fetchCart();
  };

  const handleClearCart = async () => {
    await axios.delete(`${import.meta.env.VITE_REACT_URL}cart/delete/${userId}`);
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // cart is empty when user loggout 
  if (userremove) {
    return handleClearCart()
  }

  
  if (loading) return <div className="p-4">Loading cart...</div>;

  //check cart empty or not
  if (!cart || cart.items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty 🛒
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>
      <ul className="space-y-4">
        {cart.items.map((item) => (
          <li
            key={item.product._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product.image}
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{item.product.title}</h3>
                <p className="text-sm text-gray-600">
                  ₹{item.product.price} x {item.quantity}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="bg-gray-200 px-2 rounded"
                onClick={() =>
                  handleUpdateQuantity(item.product._id, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                className="ml-4 text-red-600 text-3xl"
                onClick={() => handleRemoveItem(item.product._id)}
              >
                ⨯
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="text-lg font-bold">
          Total: ₹
          {cart.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          )}
        </p>
        <button
          onClick={handleClearCart}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Clear Cart
        </button>
      </div>

      <div>
        <button
          onClick={handleClearCart}
          className="mt-2 bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-green-600 transition ease-in"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
