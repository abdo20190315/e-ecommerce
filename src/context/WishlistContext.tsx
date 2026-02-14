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
import { useSession } from "next-auth/react";

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
  const { status } = useSession();

  async function refreshWishlist() {
    // Don't fetch if user is not authenticated or still loading
    if (status === 'loading') {
      // Keep loading state while session is loading
      return;
    }
    
    if (status !== 'authenticated') {
      setWishlist([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const data: WishlistResponse | null = await getWishlist();

      if (data?.data && Array.isArray(data.data)) {
        const ids = data.data.map(product => product._id);
        setWishlist(ids);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    refreshWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
