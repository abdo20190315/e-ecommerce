import { CategoeryType } from '@/types/CategoeryType';
import Link from 'next/link';
import React from 'react'

export default async function Categories() {


  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/categories`,
    {
    
      //  cache: 'force-cache'
      next:{revalidate:60}
    }
  )
  const {data}   = await response.json()
  console.log(data);
  
  return <>

  <div className="container mx-auto my-12 ">
  <div className="flex flex-wrap -mx-4">
    {data.map((category:CategoeryType) => (
      <div
        key={category._id}
        className="px-4 mb-8 w-full sm:w-1/2 md:w-1/3 shadow "
      >
        <Link href={`/categories/${category._id}`}>
        <div className="inner  bg-white dark:bg-gray-800 shadow rounded-lg h-full flex flex-col items-center">
          <img src={category.image} alt={category.name || 'Category image'} className="w-full h-60 object-cover rounded-t-lg" loading="lazy" />
          <p className="text-center text-slate-700 dark:text-white font-semibold py-4">
            {category.name}
          </p>
        </div>
        </Link>
        
      </div>
    ))}
  </div>
  
  </div>
  
  
  
  
  
  
  
  
  
  
  
  </>
}
