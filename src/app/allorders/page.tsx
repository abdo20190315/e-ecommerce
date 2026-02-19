'use client'
import { cartContext } from '@/context/CartContext';
import { Order } from '@/types';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../loading';

export default function AllOrder() {
  const { cartOwner } = useContext(cartContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    if (!cartOwner) return;

    try {
      setLoading(true);

      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/orders/user/${cartOwner}`
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cartOwner) {
      getOrders();
    }
  }, [cartOwner]);

  if (loading) {
    // Don't wrap <Loading /> with a <p>, so we avoid div-in-p issues
    return (
      <div className="p-6">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">
        All Orders
      </h2>

      {!loading && orders.length === 0 && <p>No orders yet.</p>}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-md p-6 mb-6 bg-gray-50 relative"
        >
          <h3 className="font-semibold text-lg mb-2">
            Order #{order._id.slice(-6)}
          </h3>

          <p className="text-sm text-gray-600">
            Order Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>

          <p className="text-sm text-gray-600">
            Payment: {order.paymentMethodType} (
            <span className="text-green-600">
              {order.isPaid ? "Paid" : "Not Paid"}
            </span>
            )
          </p>

          <p className="text-sm text-gray-600">
            Delivered:{" "}
            <span className="font-medium">
              {order.isDelivered ? "Yes" : "No"}
            </span>
          </p>

          <p className="text-sm font-semibold mt-1">
            Total: {order.totalOrderPrice} EGP
          </p>

          {order.shippingAddress && (
            <div className="mt-4">
              <p className="font-semibold">Shipping Address</p>
              <p className="text-sm text-gray-600">
                {order.shippingAddress.city}, Egypt
              </p>
              <p className="text-sm text-gray-600">
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
          )}

          <button className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm">
            View Order Items
          </button>

          {/* Remove order.updatedAt since it is not present on type Order */}
          <p className="absolute bottom-3 right-4 text-xs text-gray-400">
            Last updated:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      ))}
    </div>
  );
}