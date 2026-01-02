import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Shop from "./Shop";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const userId = localStorage.getItem("_id");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const navigate = useNavigate();
  // 🔥 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/${userId}`
      );

      setCart(res.data.items || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  // ➕➖ Update Quantity
  const updateQty = async (productId, qty) => {
    if (qty < 1) return;

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/update`, {
        userId,
        productId,
        quantity: qty,
      });
      fetchCart();
    } catch {
      toast.error("Failed to update cart");
    }
  };

  // ❌ Remove Item
  const removeItem = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/remove`, {
        data: { userId, productId },
      });
      toast.success("Item removed");
      fetchCart();
    } catch {
      toast.error("Failed to remove item");
    }
  };

  // 🗑 Clear Cart
  const clearCart = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/delete/${userId}`
      );
      toast.success("Cart cleared");
      setCart([]);
    } catch {
      toast.error("Failed to clear cart");
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center font-black">
        Loading Cart...
      </div>
    );
  }

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const handleCheckout = async () => {
    if (checkoutLoading) return; 

    const userId = localStorage.getItem("_id");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      toast.error("Please login to continue");
      setCheckoutLoading(false);
      return;
    }

    const resScript = await loadRazorpay();
    if (!resScript) {
      toast.error("Razorpay SDK failed to load");
      setCheckoutLoading(false);
      return;
    }

    try {
      const orderRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/create`,
        {
          userID: userId,
          totalAmount: total,
          items: cart.map((item) => ({
            productId: item.product._id,
            title: item.product.title,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { razorpayOrder } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "VEXUS Store",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/order/verify`,
              response,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment successful 🎉");

              await clearCart();
              window.dispatchEvent(new Event("cart-change"));
              navigate("/");
            }
          } catch (err) {
            toast.error("Payment verification failed");
          } finally {
            setCheckoutLoading(false); // ✅ stop loader after payment
          }
        },

        prefill: {
          name: localStorage.getItem("name"),
          email: localStorage.getItem("email"),
        },

        theme: {
          color: "#000000",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
      setCheckoutLoading(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-24 px-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black mb-10">Your Cart</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex gap-6 bg-white p-5 rounded-2xl shadow"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-28 h-28 object-cover rounded-xl"
                    />

                    <div className="flex-1">
                      <h3 className="font-bold">{item.product.title}</h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.product.price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQty(item.product._id, item.quantity - 1)
                          }
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          −
                        </button>

                        <span className="font-bold">{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQty(item.product._id, item.quantity + 1)
                          }
                          className="px-3 py-1 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="text-red-500 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="mt-12 bg-white p-6 rounded-2xl shadow flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-2xl font-black">₹{total}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="border border-black px-6 py-3 rounded-full text-sm font-bold"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                    className={`px-8 py-3 rounded-full font-bold relative flex items-center gap-2
                      ${
                        checkoutLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-black text-white hover:opacity-90"
                      }`}
                  >
                    {checkoutLoading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <Shop limit={4} />
    </>
  );
};

export default Cart;
