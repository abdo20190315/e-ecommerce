'use client'
import { CartResponse } from "@/types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getCartAction } from "@/app/cart/_action/getCart.action";
import Loading from "@/app/loading"; // Import the loading component

export const cartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsloading: (value: boolean) => void;
  getCart: () => void;
  cartOwner: string | null;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsloading: () => {},
  getCart: () => {},
  cartOwner: null
});

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsloading] = useState(true);
    const [cartData, setCartData] = useState<CartResponse | null>(null);
    const [cartOwner, setCartOwner] = useState<string | null>(null);

    async function getCart() {
        setIsloading(true);
        try {
            const data = await getCartAction(); 
            setCartData(data);
            setCartOwner(data.data.cartOwner);
            console.log(data);
        } catch (err) {
            console.error(err);
            setCartData(null);
            setCartOwner(null);
        }
        setIsloading(false);
    }

    useEffect(() => {
        getCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <cartContext.Provider value={{ cartData, setCartData, isLoading, setIsloading, getCart, cartOwner }}>
            {children}
        </cartContext.Provider>
    );
}
