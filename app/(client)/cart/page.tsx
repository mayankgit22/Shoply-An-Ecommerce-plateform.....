"use client"
import React,{useEffect, useState} from 'react'
import { useCart } from '../Context'
import{Product} from '@/sanity.types'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image';
function Page() {
  const{cartMap,wishMap}=useCart();
  const [loading,setLoading]=useState(false);
    const query=`*[_type == "product" ] | order(name desc) {
  name,
   _id,
  images,
  status,
  stock,
  price,

  discount,
  "categories": categories[]->title
}
`
  const [products,setProducts]=useState<Product[]>([]);
  // const [cartProducts]=React.useState<Product[]>([])
 const params={variant:"gadgets"}
 useEffect(()=>{
    setLoading(true)
         const fetchProducts = async () => {
             try{
            const data=await client.fetch(query,params)
     
            setProducts(data)
             
        }
         catch(err){
      
        console.error("Error fetching products:", err)

    }finally{
        setLoading(false)
    }
  }
  //  setTimeout(fetchProducts,5000);
   fetchProducts()


   

 
},[])

  const cartIds=cartMap.keys().toArray();
 
const cartProducts = React.useMemo(() => {
  return products.filter(product => cartIds.includes(product._id));
}, [products, cartMap]);
// console.log(cartProducts)

// console.log(products)
// if(loading){
//   return(<div>
//     Loading......
//   </div>)
// }
  return (<>
  <div className='flex justify-center'>
    <button className='bg-green-500 hover:cursor-pointer hover:bg-green-600 text-white p-3 m-2 rounded-3xl justify-center'>Checkout</button>

  </div>
    <div>
{loading?<div className='text-2xl w-[100%] h-[10vh] flex justify-center items-center'>Loading...</div>: cartProducts.map((product,index)=>(
  <div key={index} className=' justify-between flex rounded-sm  items-center border-1 border-black p-2 m-1'>
    <div className='flex w-[50%] items-center'>
   {product?.images && <Image src={urlFor(product?.images[0]).url()} width={200} height={200} className='w-full h-40 object-contain' alt="img"   priority  />}
    <div className='w-[100%]'>
    <div>{product.name}</div>
    <div className='font-bold'>${((product?.price)*(1-product?.discount/100))?.toFixed(2)}</div>
    <div className='line-through'>{(product?.price)?.toFixed(2)}</div>
    <div>In Stock:{product?.stock}</div></div>
    </div>
    <div className='pr-2 font-medium text-xl'> Total items in Cart:{cartMap.get(product?._id)}</div>
  </div>
))}
    </div>
    </>
  )
}

export default Page
