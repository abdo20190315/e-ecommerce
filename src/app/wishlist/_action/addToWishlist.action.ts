export async function addToWishlist(productId: string) {
  
  
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwODQwNTE4LCJleHAiOjE3Nzg2MTY1MTh9.Xu8R40q2c-HUONB7mPf2P3re53NDQbBFusBZMfedeTk",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        // next:{revalidate:60}
        cache: "no-store",
        
      }
      
    );
  
    return res.json();
  }