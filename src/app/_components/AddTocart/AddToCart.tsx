'use client'
import { addToCart } from '@/app/product/_action/addToCart.action'
import { Button } from '@/components/ui/button'
import React, { useState, memo, useRef, useContext } from 'react'
import { FaCartShopping } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import { cartContext } from '@/context/CartContext';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useWishlist } from '@/context/WishlistContext';
import { addToWishlist } from '@/app/wishlist/_action/addToWishlist.action';
import { removeFromWishlist } from '@/app/wishlist/_action/removeFromWishlist.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Save Function Structure Pattern: Single handler function, abstracted/unified, using session/router as needed

const AddToCart = memo(function AddToCart({ productId }: { productId: string }) {
  const { setCartData } = useContext(cartContext);
  const { wishlist, setWishlist } = useWishlist();
  const isInWishlist = wishlist.includes(productId);

  const [isloading, setIsloading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const session = useSession();
  const router = useRouter();

  // Abstracted save handler following "save function structure" pattern
  const handleAddToCart = async () => {
    if (session.status !== 'authenticated') {
      router.push('/login');
      return;
    }
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsloading(true);
    try {
      const data = await addToCart(productId);
      if (data.status === 'success') {
        toast.success('Product added successfully');
        setCartData(data);
      } else {
        toast.error('Product failed to be added');
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart');
    } finally {
      isLoadingRef.current = false;
      setIsloading(false);
    }
  };

  // ⭐ toggle wishlist with save-like handling
  async function toggleWishlist() {
    if (wishLoading) return;
    if (session.status !== 'authenticated') {
      router.push('/login');
      return;
    }
    setWishLoading(true);
    try {
      if (isInWishlist) {
        await removeFromWishlist(productId);
        setWishlist(wishlist.filter(id => id !== productId));
        toast.success("Removed from wishlist");
      } else {
        await addToWishlist(productId);
        setWishlist([...wishlist, productId]);
        toast.success("Added to wishlist");
      }
    } finally {
      setWishLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between w-[80%] gap-2 mx-auto">
        <Button
          onClick={handleAddToCart}
          className="bg-green-600 dark:bg-white flex-1"
          disabled={isloading}
        >
          {isloading ? (
            <span className="animate-spin inline-block w-4 h-4 border-2 border-white dark:border-gray-600 border-t-transparent rounded-full" />
          ) : (
            <FaCartShopping />
          )}
          Add to cart
        </Button>

        <button
          onClick={toggleWishlist}
          className="ml-2 text-xl relative"
          disabled={wishLoading}
          style={{ position: 'relative', minWidth: 24, minHeight: 24 }}
        >
          {wishLoading ? (
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full"></span>
          ) : isInWishlist ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>
    </>
  );
});

export default AddToCart;
