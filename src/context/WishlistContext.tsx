'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { getWishlist } from "@/app/wishlist/_action/getWishlist.action";
import { WishlistResponse } from "@/types/wishlist";

type WishlistContextType = {
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
  refreshWishlist: () => Promise<void>;
  isLoading: boolean;
};

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function refreshWishlist() {
    try {
      setIsLoading(true);

      const data: WishlistResponse = await getWishlist();

      const ids = data.data.map(product => product._id);

      setWishlist(ids);
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        refreshWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be inside WishlistProvider");
  }

  return context;
}
