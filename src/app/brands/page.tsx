import React from 'react'
import getBrands from '../api/brands.api'
import { Brand } from '@/types'
import Link from 'next/link'

export default async  function Cart() {

  const data = await getBrands()
  return<>

<div className="container mx-auto flex flex-wrap">
        {data.map((brand:Brand) => (
          <div key={brand._id} className="w-full sm:1/2 md:w-1/3 lg:w-1/4 ">

            <Link href={`/brands/${brand._id}`}>
            <div className="product p-5">
              <img src={brand.image }  alt='img'/>
              <p className='text-center text-2xl'>{brand.name}</p>
              
            </div>

            </Link>
            
         
            
          </div>
        ))}
      </div>
  
  
  </>
}
