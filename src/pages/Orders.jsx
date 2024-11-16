import React, { useEffect, useState } from "react";
import axios from "../Auth/axiosConfig";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/v1/orders/getAllOrders");
        
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
      <h1 className="text-2xl font-bold mb-4 text-gray-800 ">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">Order ID</th>
              <th className="px-4 py-2 border border-gray-300 text-left">User</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Order Items</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Order Date</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Total Amount</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{order.id}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {order.user?.name} ({order.user?.email})
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  <ul className="list-disc pl-5">
                    {order.orderItems.map((item, index) => (
                      <li key={index}>
                        {item.productName} ({item.quantity} pcs)
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 border border-gray-300">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="px-4 py-2 border border-gray-300">${order.totalAmount}</td>
                <td className="px-4 py-2 border border-gray-300">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
