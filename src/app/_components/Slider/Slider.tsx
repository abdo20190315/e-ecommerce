'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules'

export default function Slider({data}) {
  return (
    <>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id}>
            <img src={item.image} alt={item.name} className='h-50 w-full' />
            <p>{item.name}</p>
          </SwiperSlide>
        ))}
        
      </Swiper>
    </>
  )
}
