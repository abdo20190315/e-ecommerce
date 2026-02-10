'use client'
import { cartContext } from '@/context/CartContext';
import React, { useContext } from 'react'

export default function AllOrder() {
    const { cartOwner } = useContext(cartContext);




    async function getOrders() {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`)
        const data = await response.json()

        
    }
  return <>

  <div>AllOrders</div>
  </>
}
