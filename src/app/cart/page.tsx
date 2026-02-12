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

  useEffect(() => {
    if (typeof cartData?.data?.products[0]?.product == "string" || cartData == null) {
      getCart();
    }
  }, [cartData, getCart]);

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
    <>{isLoading || typeof cartData?.data.products[0]?.product == 'string'?<Loading/> : (cartData?.numOfCartItems ?? 0) > 0  ?<div className="container mx-auto px-4 py-10 min-h-[500px] flex items-center justify-center">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-muted-foreground mt-1">10 items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        {cartData?.data.products.map((item)=><div key={item._id} className="lg:col-span-2 space-y-4">
          <Card className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardContent className="p-5 flex gap-5 items-center">
              {/* Product Image */}
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-24 h-24 object-cover rounded-xl border"
              />

              {/* Product Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-lg">
                {item.product.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                {item.product.brand.name}.{item.product.category.name}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                  <Button onClick={()=>ubdateCartItem(item.product._id , item.count-1)} disabled={item.count==1} variant="outline" size="icon">
                   <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center">  {updatingId == item.product._id ? <Loading/> :item.count }</span>
                  <Button onClick={()=>ubdateCartItem(item.product._id , item.count+1)}  variant="outline" size="icon">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="text-right space-y-3">
                <p className="font-semibold text-lg"> {item.price}EGP</p>
                <button onClick={()=>removeCartItem(item.product._id )} className="flex items-center gap-1 text-red-500 text-sm hover:underline ml-auto">
                  {removingId == item.product._id? <Loading/> : <Trash2 size={16} />} Remove
                </button>
              </div>
            </CardContent>
          </Card>
        </div>)}

        {/* Order Summary */}
        <div>
          <Card className="rounded-2xl shadow-sm sticky top-6">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({cartData?.numOfCartItems} items)
                  </span>
                  <span>{cartData?.data.totalCartPrice}EGP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{cartData?.data.totalCartPrice} EGP</span>
              </div>
              <div className="space-y-3">
                <CheckOut cartId={cartData?.cartId}/>
              
                <Button variant="secondary" className="w-full h-11 text-base">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Clear Cart */}
          <div className="flex justify-end mt-4">
            <Button onClick={()=>clearItem()} variant="outline" className="text-red-500">
              <Trash2 size={16} className="mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div> : 
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
       
        <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Looks like you haven&apos;t added any products yet.</p>
        <Link href="/product">
          <Button 
            variant="outline" 
            className="px-6 py-2 text-base"
          >
            Continue Shopping
          </Button>
        </Link>
      </div>
    }
    
    </>
  );
}
