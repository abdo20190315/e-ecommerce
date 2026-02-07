'use client'
import React, { useContext } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cartContext } from "@/context/CartContext";
import Loading from "../loading";

export default function Cart() {
 const {cartData ,isLoading , getCart}= useContext(cartContext)

 typeof cartData?.data.products[0].product == 'string' && getCart()

  return (
    <>{isLoading || typeof cartData?.data.products[0].product == 'string'?<Loading/> :   <div className="container mx-auto px-4 py-10">
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
                  <Button variant="outline" size="icon">
                    <Minus size={16} />
                  </Button>
                  <span className="w-6 text-center">{item.count}</span>
                  <Button variant="outline" size="icon">
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="text-right space-y-3">
                <p className="font-semibold text-lg"> {item.price}EGP</p>
                <button className="flex items-center gap-1 text-red-500 text-sm hover:underline ml-auto">
                  <Trash2 size={16} /> Remove
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
                <Button className="w-full h-11 text-base">
                  Proceed to Checkout
                </Button>
                <Button variant="secondary" className="w-full h-11 text-base">
                  Continue Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Clear Cart */}
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="text-red-500">
              <Trash2 size={16} className="mr-2" />
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </div>}
    
    </>
  );
}
