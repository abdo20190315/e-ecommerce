'use client'
import { CartResponse } from "@/types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getCartAction } from "@/app/cart/_action/getCart.action";
import Loading from "@/app/loading"; // Import the loading component
import { useSession } from "next-auth/react";

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
    const { data: session, status } = useSession();

    async function getCart() {
        // Don't fetch if user is not authenticated or still loading
        if (status === 'loading') {
            // Keep loading state while session is loading
            return;
        }
        
        if (status !== 'authenticated') {
            setCartData(null);
            setCartOwner(null);
            setIsloading(false);
            return;
        }

        setIsloading(true);
        try {
            const data = await getCartAction(); 
            if (data) {
                setCartData(data);
                setCartOwner(data.data.cartOwner);
            } else {
                setCartData(null);
                setCartOwner(null);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
            setCartData(null);
            setCartOwner(null);
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        getCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <cartContext.Provider value={{ cartData, setCartData, isLoading, setIsloading, getCart, cartOwner }}>
            {children}
        </cartContext.Provider>
    );
}
