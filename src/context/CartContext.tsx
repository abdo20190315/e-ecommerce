'use client'
import { CartResponse } from "@/types";
import {ReactNode, createContext, useEffect,  useState} from "react";



 export const cartContext=   createContext<{
  cartData: CartResponse | null;
  setCartData: (value:CartResponse | null) => void;
  isLoading: boolean;
  setIsloading: (value:boolean) => void;
  getCart:()=>void;
 }>({//init value
    cartData:null,
    setCartData:()=>{},
    isLoading:false,
    setIsloading:()=>{},
    getCart:()=>{}

 })

 export default function CartContextProvider({children}:{children:ReactNode}){

    const [isloading, setIsloading] = useState(false)
    const [cartData, setCartData] = useState<CartResponse | null>(null)

   async function getCart(){
    setIsloading(true)
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMzAzMDU3LCJleHAiOjE3NzgwNzkwNTd9.zeH3KYRGFLWbK5iRJzPr4Bg_y7D8tfmWn58WF9Un7NA"
            }
        })
        const data:CartResponse = await response.json()
        setCartData(data)
        console.log(data);
        setIsloading(false)
        
    }
    useEffect(() => {
        getCart()
    }, [])
    

return <cartContext.Provider value={{ cartData ,setCartData , isloading , setIsloading , getCart}}>
    {children}
</cartContext.Provider>


 }