
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { ProductType } from '@/types/productType';
import React from 'react'

export default async function CategoriesDetails({ params }: { params: { id: string } }) {
  const { id } = await params;

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products?categories=${id}`,{
    next:{revalidate:60}
  }
  );

  const { data } = await response.json();

  // Show a message if no products are found for this brand
  if (!data || !data.length) {
    return (
      <div className="container mx-auto my-16 text-center text-xl text-gray-600 dark:text-gray-300">
        No products found for this categories.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
        Products from this categories
      </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((product: ProductType) => (
          <div
            key={product._id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          >
            <div className="product p-5 bg-white dark:bg-gray-900 rounded-lg shadow">
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

