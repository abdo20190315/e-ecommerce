export default async  function getBrands(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/brands`,{
        method:'GET',
        //  cache: 'force-cache'
        next:{revalidate:60}
    })

    const {data} = await response.json()

    return data;
}