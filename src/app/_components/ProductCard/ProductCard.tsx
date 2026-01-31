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
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types/productType';
export default function ProductCard({product}:{product:ProductType}) {
  return <>

  <Card>
  <Link href={`product/${product._id}`}>
  <CardHeader>
    <CardTitle> <img src={product.imageCover} className='' /> </CardTitle>

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
  </Link>
  <Button className='bg-green-600 dark:bg-white  w-[80%] mx-auto'>Add to card</Button>
</Card>

  
  </>
}

