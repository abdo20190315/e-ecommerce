'use client'
import React, { useContext, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartContext } from "@/context/CartContext";
import Loading from "../loading";
import toast from "react-hot-toast";
import Link from "next/link";
import CheckOut from "../_components/checkOut/CheckOut";

import { removeCartItemAction } from "@/app/cart/_action/removeCartItem.action";
import { updateCartItemAction } from "@/app/cart/_action/updateCartItem.action";
import { clearCartAction } from "@/app/cart/_action/clearCart.action";

export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(cartContext);
  const [removingId, setRemovingId] = useState<null | string>(null);
  const [updatingId, setUpdatingId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);

  // useEffect(() => {
  //   if (typeof cartData?.data?.products[0]?.product == "string" || cartData == null) {
  //     getCart();
  //   }
  // }, [cartData, getCart]);

  useEffect(() => {
    if (!cartData) {
      getCart();
    }
  }, []);
  

  // ================= Server Actions =================
  async function removeCartItem(productId: string) {
    setRemovingId(productId);
    try {
      const data = await removeCartItemAction(productId);
      if (data.status == "success") {
        setCartData(data);
        toast.success("Item deleted successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
    setRemovingId(null);
  }

  async function ubdateCartItem(productId: string, count: number) {
    setUpdatingId(productId);
    try {
      const data = await updateCartItemAction(productId, count);
      if (data.status == "success") {
        setCartData(data);
        toast.success("Product quantity updated successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update item");
    }
    setUpdatingId(null);
  }

  async function clearItem() {
    setIsClearing(true);
    try {
      const data = await clearCartAction();
      if (data.message == "success") {
        setCartData(null);
        toast.success("Cart cleared successfully");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to clear cart");
    }
    setIsClearing(false);
  }



  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == "string" ? (
        <div className="flex justify-center items-center min-h-[400px] w-full">
          <Loading />
        </div>
      ) : (cartData?.numOfCartItems ?? 0) > 0 ? (
        <div className="container mx-auto px-2 sm:px-4 py-6 min-h-[500px] flex flex-col items-center">
          {/* Header */}
          <div className="w-full max-w-5xl mb-6 md:mb-10 px-2">
            <h1 className="text-2xl sm:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              {cartData?.numOfCartItems ?? 0} items in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full max-w-5xl">
            {/* Cart Items */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4">
              {cartData?.data.products.map((item) => (
                <Card
                  key={item._id}
                  className="rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-7">
                    {/* Product Image */}
                    <div className="w-full sm:w-28 flex-shrink-0 mb-2 sm:mb-0 flex justify-center">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title || 'Product image'}
                        className="w-24 h-24 object-cover rounded-xl border"
                        loading="lazy"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 w-full">
                      <h6 className="font-semibold  sm:text-xl  line-clamp-2">
                        {item.product.title}
                      </h6>
                      <p className="text-sm text-muted-foreground mt-1 truncate">
                        {item.product.brand.name} &bull; {item.product.category.name}
                      </p>
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          onClick={() => ubdateCartItem(item.product._id, item.count - 1)}
                          disabled={item.count === 1 || updatingId === item.product._id}
                          variant="outline"
                          size="icon"
                          className="flex-none"
                        >
                          <div className="w-4 h-4 flex items-center justify-center overflow-hidden">
                            <Minus size={16} />
                          </div>
                        </Button>
                        <span className="flex-none w-8 inline-flex justify-center text-center font-medium">
                          {updatingId === item.product._id ? (
                            <span className="w-4 h-4 flex items-center justify-center overflow-hidden">
                              <Loading />
                            </span>
                          ) : (
                            item.count
                          )}
                        </span>
                        <Button
                          onClick={() => ubdateCartItem(item.product._id, item.count + 1)}
                          variant="outline"
                          size="icon"
                          disabled={updatingId === item.product._id}
                          className="flex-none"
                        >
                          <div className="w-4 h-4 flex items-center justify-center overflow-hidden">
                            <Plus size={16} />
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex flex-col items-end gap-2 sm:gap-3 w-full sm:w-28">
                      <p className="font-semibold text-lg">{item.price} <span className="text-sm text-muted-foreground">EGP</span></p>
                      <button
                        onClick={() => removeCartItem(item.product._id)}
                        className="flex items-center gap-1 text-red-500 text-sm hover:underline"
                        disabled={removingId === item.product._id}
                      >
                        <span className="flex-none w-4 h-4 flex items-center justify-center overflow-hidden">
                          {removingId === item.product._id ? (
                            <Loading />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </span>
                        <span className="flex-none">Remove</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
              <Card className="rounded-xl shadow-sm sticky top-6">
                <CardContent className="p-5 sm:p-6 space-y-5">
                  <h2 className="text-xl font-semibold text-center sm:text-left">
                    Order Summary
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal
                        <span className="hidden sm:inline"> ({cartData?.numOfCartItems} items)</span>
                      </span>
                      <span>{cartData?.data.totalCartPrice} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                  </div>
                  <div className="border-t pt-3 flex justify-between font-semibold text-base sm:text-lg">
                    <span>Total</span>
                    <span>{cartData?.data.totalCartPrice} EGP</span>
                  </div>
                  <div className="space-y-3">

                    {/* Checkout */}
                    <CheckOut cartId={cartData?.cartId ?? ""} />

                    <Link href="/product">
                      <Button variant="secondary"  className="w-full h-11 text-base bg-white text-black dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700">
                        Continue Shopping
                      </Button>
                    </Link>
                    <Button
                    onClick={() => clearItem()}
                    variant="outline"
                     className="w-full h-11 my-2 text-base bg-white text-black dark:bg-gray-900 dark:text-white border-gray-300 dark:border-gray-700"
                    disabled={isClearing}
                  >
                    <span className="flex-none w-4 h-4 mr-2 flex items-center justify-center overflow-hidden">
                      {isClearing ? <Loading /> : <Trash2 size={16} />}
                    </span>
                    <span className="flex-none">Clear Cart</span>
                  </Button>
                  </div>
                </CardContent>
               
                
              </Card>

              {/* Clear Cart */}
             
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 space-y-6 w-full">
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1">Your cart is empty</h2>
            <p className="text-gray-500 mb-4 text-center">Looks like you haven&apos;t added any products yet.</p>
            <Link href="/product">
              <Button
                variant="outline"
                className="px-6 py-2 text-base font-medium"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
