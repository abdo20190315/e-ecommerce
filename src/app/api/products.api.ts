

export default async  function getProduct(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/products`,{
        method:'GET',
        //  cache: 'force-cache'
        next:{revalidate:60}
    })

    const {data} = await response.json()

    return data;
}