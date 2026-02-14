'use client'

import { CategoeryType } from '@/types/CategoeryType';
import Marquee from "react-fast-marquee";

export default function Slider({data}:{data:CategoeryType[]}) {
  return (
    <>
   <Marquee speed={45} gradient={false} loop={0} pauseOnHover autoFill >

   {data.map((item:CategoeryType) => (
          <div key={item._id}>
            <img src={item.image} alt={item.name} className='h-48 w-full object-cover' loading="lazy" />
            <p className='text-center text-slate-700 dark:text-white font-semibold'>{item.name}</p>
          </div>
        ))}

   </Marquee>
    
        
     
    </>
  )
}
