import { CategoeryType } from '@/types/CategoeryType';
import React from 'react'

export default async function Categories() {


  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,
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
        <div className="inner  bg-white dark:bg-gray-800 shadow rounded-lg h-full flex flex-col items-center">
          <img src={category.image} alt="cat" className="w-full h-60 object-cover rounded-t-lg" />
          <p className="text-center text-slate-700 dark:text-white font-semibold py-4">
            {category.name}
          </p>
        </div>
      </div>
    ))}
  </div>
  
  </div>
  
  
  
  
  
  
  
  
  
  
  
  </>
}
