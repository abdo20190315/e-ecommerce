import AddToCart from '@/app/_components/AddTocart/AddToCart';
import React from 'react'
import ImageWithFallback from '@/app/_components/ImageWithFallback/ImageWithFallback'

export default async function ProductDetails({params}:{params:{id:string}}) {

const {id} = await params
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products/${id}`)
  const {data} = await response.json()
  // console.log(data);

  return (
    <div className="container mx-auto my-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row gap-8 max-w-4xl">
      <div className="flex-1 flex justify-center items-start">
       <ImageWithFallback
          src={data.imageCover}
          alt={data.title || 'Product image'}
          width={800}
          height={800}
          loading="lazy"
          className="w-full max-w-xs rounded-lg object-cover shadow-md bg-gray-100 dark:bg-gray-800"
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{data.title}</h1>
        <div className="text-gray-500 dark:text-gray-300 text-base">{data.category?.name}</div>
        <p className="text-gray-700 dark:text-gray-200">{data.description}</p>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-2xl font-semibold text-green-600 dark:text-green-400">{data.price} EGP</span>
          <span className="flex items-center gap-1 text-yellow-500 dark:text-yellow-400 font-medium">
            {data.ratingsAverage}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.561-.955L10 0l2.952 5.955 6.561.955-4.757 4.635 1.122 6.545z"/>
            </svg>
          </span>
        </div>
        <div className='w-full'>
        <AddToCart productId={data._id}/>
        </div>
      </div>
    </div>
  );
}
