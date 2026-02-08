'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'
import { CategoeryType } from '@/types/CategoeryType';
// import Image from 'next/image';

export default function Slider({data}:{data:CategoeryType}) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={6}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {data.map((item:CategoeryType) => (
          <SwiperSlide key={item._id}>
            <img src={item.image} alt={item.name} className='h-48 w-full object-cover' width={300} height={200} />
            <p className='text-center text-slate-700 dark:text-white font-semibold'>{item.name}</p>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </>
  )
}
