import React, { memo } from 'react'
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
import { ProductType } from '@/types/productType';
import AddToCart from '../AddTocart/AddToCart';
import ImageWithFallback from '../ImageWithFallback/ImageWithFallback'

const ProductCard = memo(function ProductCard({product}:{product:ProductType}) {
  return <>

  <Card>
  <Link href={`product/${product._id}`}>
  <CardHeader>
    <CardTitle> 
      <ImageWithFallback 
        src={product.imageCover} 
        alt={product.title || 'Product image'} 
        width={400}
        height={400}
        loading="lazy"
        className='w-full h-auto object-cover' 
      /> 
    </CardTitle>

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
 <AddToCart productId={product._id}/>
</Card>

  
  </>
});

export default ProductCard;

