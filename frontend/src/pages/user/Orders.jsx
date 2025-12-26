import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId"); // must be saved during login
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_URL}order/${userId}`, // update your backend route accordingly
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  if (!orders.length) return <p className="text-center">No orders found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg ">
      <h2 className="text-2xl font-bold  uppercase mb-6">Your Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="mb-8 border rounded p-4">
          <p>

            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{order.totalAmount}
          </p>
          <p>
            <strong>Payment ID:</strong> {order.paymentId}
          </p>
          <p>
            <strong>Date:</strong> {order.createdAt}
          </p>
          <p>
            <strong>Address:</strong> {order.address.houseNo}/ {order.address.street} {order.address.city} {order.address.state} {order.address.postalCode} {order.address.country}
          </p>
          <p className="mt-4 font-semibold">Items:</p>
          <ul className="space-y-4">
            {order.items.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 items-center border p-2 rounded"
              >
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Orders;
