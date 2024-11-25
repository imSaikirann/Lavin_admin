import React, { useEffect, useState } from "react";
import axios from "../Auth/axiosConfig";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/orders/getAllOrders");
        console.log(response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="p-6 sm:pl-80">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Orders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-300 rounded-lg p-4 shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order.id}</h3>
            <div className="text-gray-600 mb-2">
              <p>Name: {order.user.firstName}</p>
            </div>
            <div className="text-gray-600 mb-2">
              <p>Phone number: {order.phone}</p>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Order Items:</p>
              <ul className="list-disc pl-5">
                {order.orderItems.map((item, index) => (
                  <li key={item.id}>
                    <img src={item.variantImage} alt={item.variant.color} className="w-16 h-16 mr-2 inline-block" />
                    {item.productName} ({item.quantity} pcs) - {item.variant.color}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Order Date:</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Total Amount:</p>
              <p>${order.totalAmount}</p>
            </div>

            <div className="mb-2">
              <p className="font-semibold">Address:</p>
              <p>
                {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pinCode}, {order.address.country}
              </p>
            </div>

            <div>
              <p className="font-semibold">Status:</p>
              <p>{order.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
