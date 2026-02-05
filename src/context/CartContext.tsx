'use client'
import {ReactNode, createContext, useEffect,  useState} from "react";



 const cartContext=   createContext({})

 export default function cartContextProvider({children}:{children:ReactNode}){
    const [carData, setCartData] = useState(null)

   async function getCart(){
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwMzAzMDU3LCJleHAiOjE3NzgwNzkwNTd9.zeH3KYRGFLWbK5iRJzPr4Bg_y7D8tfmWn58WF9Un7NA"
            }
        })
        const data = await response.json()
        console.log(data);
        
    }
    useEffect(() => {}, [
        getCart()
    ])
    

return <cartContext.Provider value={{}}>
    {children}
</cartContext.Provider>


 }