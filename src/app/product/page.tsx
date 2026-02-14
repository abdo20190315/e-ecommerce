
import React from 'react'


import getProduct from '../api/products.api';
import ProductCard from '../_components/ProductCard/ProductCard';
import { ProductType } from '@/types/productType';

export default async function Product() {
  const data = await getProduct() 



  return (
    <>
      <div className="container mx-auto flex flex-wrap">
        {data.map((product:ProductType) => (
          <div key={product._id} className="w-full sm:1/2 md:w-1/3 lg:w-1/4 ">
            <div className="product p-5">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

