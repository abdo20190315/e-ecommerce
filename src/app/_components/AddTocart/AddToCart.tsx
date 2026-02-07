'use client'
import { addToCart } from '@/app/product/_action/addToCart.action'
import { Button } from '@/components/ui/button'
import React, { useState, useCallback, memo, useRef, useContext } from 'react'
import { FaCartShopping } from 'react-icons/fa6';
import { toast } from 'react-hot-toast';
import { cartContext } from '@/context/CartContext';

const AddToCart = memo(function AddToCart({ productId }: { productId: string }) {

const {getCart , setCartData}=  useContext(cartContext)
    const [isloading, setIsloading] = useState(false)
    const isLoadingRef = useRef(false);

  const handleAddToCart = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsloading(true);
    try {
      const data = await addToCart(productId);
      if (data.status === 'success') {
        toast.success('Product added successfully');
        setCartData(data)
        // await getCart()

      } else {
        toast.error('Product failed to be added');
      }
    } catch (error) {
      toast.error('An error occurred while adding to cart');
      console.error(error);
    } finally {
      isLoadingRef.current = false;
      setIsloading(false);
    }
  }, [productId]);

  return (
    <>
      <Button
        onClick={handleAddToCart}
        className='bg-green-600 dark:bg-white  w-[80%] mx-auto'
        disabled={isloading}
      >
       {isloading ? (
         <span className='animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full' />
       ) : (
         <FaCartShopping />
       )}
        Add to cart
      </Button>
    </>
  );
});

export default AddToCart;
