export async function addToWishlist(productId: string) {
  
  
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ODJhMmFhYmFiODkzZmViMzY1NDQ2MiIsIm5hbWUiOiJBYmRlbHJhaG1hbiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzcwNjY5MjM0LCJleHAiOjE3Nzg0NDUyMzR9.ChGfroYZ1lz6OLXkYNly0xf2mh13yXrlaQbTirbcYIo",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
        cache: "no-store",
        
      }
      
    );
  
    return res.json();
  }