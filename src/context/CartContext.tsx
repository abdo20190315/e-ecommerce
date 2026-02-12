'use client'
import { CartResponse } from "@/types";
import {ReactNode, createContext, useEffect,  useState} from "react";



 export const cartContext=   createContext<{
  cartData: CartResponse | null;
  setCartData: (value:z | null) => void;
  isLoading: boolean;
  setIsloading: (value:boolean) => void;
  getCart:()=>void;
  cartOwner: string | null;
 }>({//init value
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsloading:()=>{},
    getCart:()=>{},
    cartOwner: null

 })

 export default function CartContextProvider({children}:{children:ReactNode}){

    const [isloading, setIsloading] = useState(false)
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [cartOwner, setCartOwner] = useState<string | null>(null);

   async function getCart(){
    setIsloading(true)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwODQwNTE4LCJleHAiOjE3Nzg2MTY1MTh9.Xu8R40q2c-HUONB7mPf2P3re53NDQbBFusBZMfedeTk"
            }
        })
        const data:CartResponse = await response.json()
        setCartData(data)
        setCartOwner(data.data.cartOwner);
        console.log(data);
        setIsloading(false)
       
        
    }
    useEffect(() => {
        getCart()
    }, [])
    

return <cartContext.Provider value={{ cartData ,setCartData , isloading , setIsloading , getCart , cartOwner}}>
    {children}
</cartContext.Provider>


 }