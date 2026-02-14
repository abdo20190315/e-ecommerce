import { getWishlist } from "./_action/getWishlist.action";
import { WishlistResponse } from "@/types/wishlist";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default async function WishlistPage() {
  const data: WishlistResponse | null = await getWishlist();

 
  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
        <p>Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        My Wishlist ({data.count})
      </h1>

      {data.data.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.data.map((product) => (
            <Link
              key={product._id}
              href={`/product/${product._id}`}
              className="border rounded-lg p-3 shadow hover:shadow-md transition"
            >
              <img
                src={product.imageCover}
                alt={product.title || "Product image"}
                className="w-full h-52 object-cover rounded"
                loading="lazy"
              />

              <h2 className="mt-3 font-semibold line-clamp-2">
                {product.title}
              </h2>
              <div className="flex justify-between">
                <p className="text-green-600 font-bold mt-2">
                  {product.price} EGP
                </p>

                <p className="flex items-center text-sm text-gray-500">
                  <FaStar className="text-yellow-400 text-xl" />
                  {product.ratingsAverage}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
