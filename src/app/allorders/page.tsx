'use client'
import { Button } from '@/components/ui/button';
import { cartContext } from '@/context/CartContext';
import { Order } from '@/types';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Loading from '../loading';

function OrderItemsModal({
  order,
  open,
  onClose,
}: {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-[95vw] max-w-lg shadow-lg max-h-[90vh] overflow-auto">
        <h4 className="text-lg font-semibold mb-4">
          Order #{order._id.slice(-6)} Items
        </h4>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl font-bold text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>
        {order.cartItems && order.cartItems.length > 0 ? (
          <ul className="mb-4">
            {order.cartItems.map((item) => (
              <li key={item._id} className="flex gap-3 mb-3 border-b pb-2 last:border-b-0 last:pb-0">
                {item.product && item.product.imageCover && (
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title || 'Product image'}
                    className="w-12 h-12 object-cover rounded"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-medium">{item.product?.title}</p>
                  <p className="text-xs text-gray-500">
                    Quantity: {item.count}
                  </p>
                  <p className="text-xs text-gray-500">
                    Price: {item.price} EGP
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found in this order.</p>
        )}
        <button
          onClick={onClose}
          className="mt-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function AllOrder() {
  const { cartOwner } = useContext(cartContext);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  // Helper: Safe date string
  function formatDate(dateStr?: string) {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleString();
  }

  if (loading) {
    return <p className="p-6"><Loading/></p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <OrderItemsModal
        order={selectedOrder}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedOrder(null);
        }}
      />

      <h2 className="text-3xl font-bold mb-8 pb-3 text-center text-green-800 tracking-wider drop-shadow-lg">
        <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-lime-600 bg-clip-text text-transparent">
          All Orders
        </span>
      </h2>

      {!loading && orders.length === 0 && (
        <p className="text-green-700 text-center opacity-90">No orders yet.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="relative border-none rounded-xl p-7 bg-gradient-to-br from-green-50 via-green-100 to-emerald-100 shadow-xl ring-1 ring-green-400/40 hover:scale-105 transition-transform duration-300"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl px-4 py-2 bg-gradient-to-r from-green-600 to-lime-500 shadow text-xs text-white font-bold tracking-widest opacity-90">
              #{order._id.slice(-6)}
            </div>

            <h3 className="font-extrabold text-lg mb-3 text-green-700 tracking-wide drop-shadow">
              {/* blank for possible icons */}
            </h3>

            <div className="space-y-2 mb-4">
              <p className="text-sm text-green-700">
                <span className="font-medium text-green-500">
                  Order Date:
                </span>{" "}
                {formatDate(order.createdAt)}
              </p>

              <p className="text-sm">
                <span className="font-medium text-green-950">Payment:</span>{" "}
                <span className="text-green-700">{order.paymentMethodType}</span>{" "}
                (
                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>
                )
              </p>

              <p className="text-sm">
                <span className="font-medium text-green-950">
                  Delivered:
                </span>{" "}
                <span
                  className={
                    order.isDelivered
                      ? "text-emerald-700 font-semibold"
                      : "text-yellow-600 font-semibold"
                  }
                >
                  {order.isDelivered ? "Yes" : "No"}
                </span>
              </p>

              <p className="text-md font-bold text-green-800 mt-3">
                <span className="text-lime-800">Total:</span>{" "}
                {order.totalOrderPrice}{" "}
                <span className="text-green-500">EGP</span>
              </p>
            </div>

            {order.shippingAddress && (
              <div className="mt-5 mb-2 p-3 rounded-lg bg-gradient-to-r from-green-100 via-lime-100 to-green-50 shadow-inner">
                <p className="font-semibold text-green-800 mb-1">
                  Shipping Address
                </p>
                <p className="text-xs text-green-500">
                  {order.shippingAddress.city}, Egypt
                </p>
                <p className="text-xs text-green-500">
                  Phone:{" "}
                  <span className="text-green-700">
                    {order.shippingAddress.phone}
                  </span>
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 mt-6">
              <Button
                className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-lime-600 hover:from-lime-700 hover:to-green-600 text-white rounded-2xl shadow-lg transition-all duration-200 text-sm font-semibold focus:ring-2 focus:ring-green-500"
                onClick={() => {
                  setSelectedOrder(order);
                  setModalOpen(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M14.5 12a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M21 12s-3-7-9-7-9 7-9 7 3 7 9 7 9-7 9-7z"
                  />
                </svg>
                <span>View Items</span>
              </Button>
            </div>

            <p className="absolute bottom-3 right-5 text-xs text-green-700 italic opacity-80">
              Last updated: {formatDate(order.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
