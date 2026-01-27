import React from 'react'
import { FaStar } from 'react-icons/fa';
import {
    Card,
   
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default function ProductCard({product}) {
  return <>
   <Card>
  <CardHeader>
    <CardTitle> <img src={product.imageCover} /> </CardTitle>

    <CardDescription>{product.category.name}</CardDescription>
  
  </CardHeader>
  <CardContent>
    <p className='line-clamp-1'>{product.title}</p>
  </CardContent>
  <CardFooter>
   <div className='flex justify-between w-full'>
    <span >
      {product.price}EGP 

    </span>
    <span className='flex items-center'>
{product.ratingsAverage}<FaStar className='text-yellow-400 text-xl' />

    </span>
   </div>
  </CardFooter>
</Card></>
}

