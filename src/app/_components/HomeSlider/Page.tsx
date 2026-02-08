'use client'
import React from 'react'
import img1 from '../../../../public/images/slider-image-1.jpeg'
import img2 from '../../../../public/images/slider-image-2.jpeg'
import img3 from '../../../../public/images/slider-image-3.jpeg'
import img4 from '../../../../public/images/blog-img-1.jpeg'
import img5 from '../../../../public/images/blog-img-2.jpeg'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules'

export default function HomeSlider() {
  return (
    <>
      <div className="container flex mx-auto my-12">
        <div className="w-3/4 ">
          <Swiper
            spaceBetween={0}
            slidesPerView={2}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
          >
            <SwiperSlide>
              <Image src={img1} alt="img" className="h-100 object-cover w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={img2} alt="img" className="h-100 object-cover w-full" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={img3} alt="img" className="h-100 object-cover w-full" />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4 flex flex-col gap-4">
          <Image src={img4} alt="img" className="h-50 object-cover w-full" />
          <Image src={img5} alt="img" className="h-50 object-cover w-full" />
        </div>
      </div>
    </>
  )
}
