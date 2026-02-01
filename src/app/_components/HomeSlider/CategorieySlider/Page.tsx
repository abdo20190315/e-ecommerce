import Slider from '../../Slider/Slider';


export default async function CategorieySlider() {
  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`,
    {
   
      next:{revalidate:60}
    }
  );
  const json = await response.json();
  const data = json?.data ?? [];

  return (
    <>
    <div className='my-12'>
    <Slider data={data} />
    </div>
     
    </>
  );
}
