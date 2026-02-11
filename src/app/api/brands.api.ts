export default async  function getBrands(){
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`,{
        method:'GET',
        //  cache: 'force-cache'
        next:{revalidate:60}
    })

    const {data} = await response.json()

    return data;
}