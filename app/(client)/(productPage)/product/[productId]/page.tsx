'use client'
import React, { useEffect,useState,use } from 'react'
import { client } from '@/sanity/lib/client'
import Image from 'next/image'
import { RemoveCartButton } from '@/components/ui/AddToCartButton'
import AddToCartButton from '@/components/ui/AddToCartButton'
import AddToWish from '@/components/ui/AddToWish'
import { urlFor } from '@/sanity/lib/image'
import { StarIcon,Flame } from 'lucide-react'
import { Product } from '@/sanity.types'
import {useCart} from '../../../Context'

type Props = {
  params: Promise<{ productId: string }>;
};

export default function Page({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  // const [count,setCount]=useState(0)
const {productId}=use(params);
const {cartMap,setCartMap,wishMap,setWishMap,count,setCount} =useCart();
const addTocart=async(product:Product)=>{
  // const count=cartMap.get(product?._id);
  // setCount(count!);
  const stock=product?.stock as number;
  const productCount=cartMap.get(product?._id);
if(count!>=stock ||productCount!>=stock) {
  setCount(productCount!);
  alert('Can not add more than available stock');
   return ;}
 setCount(prev=>prev+1);
const id=product?._id;
console.log(id)

  const cartItem = cartMap.get(id);
  console.log(cartItem)
  if(!cartItem)setCartMap(prev => {
      const newMap = new Map(prev);
      newMap.set(id, 1);
      return newMap;
    });
  else  {
    setCartMap(prev => {
      const newMap = new Map(prev);
      const items=prev.get(id);
      newMap.set(id, items!+1);
      return newMap;
    });
  } 
}
const removeFromCart=async(product:Product)=>{
  // const count=cartMap.get(product?._id);
  // setCount(count!);
  // const stock=product?.stock as number;
  const productCount=cartMap.get(product?._id);
if(count!<=0 ||productCount!<=0) {
  setCount(productCount!);
  alert('Can not decrease more than it');
   return ;}
 setCount(prev=>prev-1);
const id=product?._id;
console.log(id)

  const cartItem = cartMap.get(id);
  console.log(cartItem)
  if(!cartItem)setCartMap(prev => {
      const newMap = new Map(prev);
      newMap.set(id, 1);
      return newMap;
    });
  else  {
    setCartMap(prev => {
      const newMap = new Map(prev);
      const items=prev.get(id);
      newMap.set(id, items!-1);
      return newMap;
    });
  } 
}
const addToWish=(product:Product)=>{
  const id=product?._id;
  const wishItem = wishMap.get(id);
  if(!wishItem)setWishMap(prev => {
      const newMap = new Map(prev);
      newMap.set(id, 1);
      return newMap;
    });
  else  {
    setWishMap(prev => {
      const newMap = new Map(prev);
      const items=prev.get(id);
      newMap.set(id, items!+1);
      return newMap;
    });
  }
  
}

// console.log(cartMap )
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetched = await client.fetch(
          `*[_type == "product" && _id == $id][0]`,
          { id: productId }
        )
        setProduct(fetched)
      } catch (err) {
        console.error('Error fetching product:', err)
      }
    }

    fetchProduct()
  }, [productId])

  if (!product) return <div className='text-2xl w-[100%] h-[50vh] flex justify-center items-center'>Loading...</div>


const discount1=product?.discount as number;
const discountedPrice=product?.price ? (product?.price-(product.price * discount1)/100).toFixed(2) : 'N/A';

  return (
    <div className='h-[max-content] relative'>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-5 border-1 h-full px-6 py-4' >
      <div className='  md:col-span-2 border-1 flex justify-center items-center'>
        <div className='h-[100%] w-[100%]  p-2  relative  margin-auto'>
   <AddToWish fun={()=>addToWish(product)} product={product} className="absolute top-2 let-2" />
              {product?.status === "sale" && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-md px-2 py-1 rounded">
                  Sale!
                </span>
              )}
              {product?.status === "hot" && (
                <span className="absolute top-2 right-2 border-2 border-orange-500  text-orange-500 text-md5   py-1 px-1 rounded-full">
                  <Flame fill="#fb6c08" className="w-4 h-4 inline" />
                </span>
              )}
              {product?.status === "new" && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-md px-2 py-1 rounded">
                  New
                </span>
              )}
{product?.images && (
  
                <Image
                  src={urlFor(product?.images[0]).url()}
                  width={500}
                  height={500}
                  className="w-[100%] h-[100%] object-contain"
                  alt="img"
                    priority 
                />
              )}</div>
      </div>
      <div className='  md:col-span-3   p-4'>
        <div>
          <h1 className='text-2xl font-bold'>{product?.name}</h1>
          <div className="flex  flex-col mb-4 mt-4  ">
            <div className='flex'>
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={15}
                    className="text-shop_light_green"
                    fill={"#3b9c3c"}
                  />
                ))}</div>
                <div>
                  <h2 className="mt-3">
                {(product.stock as number) && product?.stock == 0
                  ? "Out of stock"
                  : product?.stock
                    ? `In stock ${product?.stock} `
                    : "Loading..."}{" "}
              </h2></div>
              
              </div>
              <div>
                <h1 className='text-3xl font-bold'>${discountedPrice}</h1>
           <h2 className="text-xl font-light mt-2 mb-3 line-through">
                {product?.price
                  ? `$${product?.price.toFixed(2)}`
                  : "Price not available"}
              </h2> 
              </div>
               <div>  {product?.stock as number &&
              <div className=" relative w-[50%] flex gap-5">
                <RemoveCartButton className="w-5 h-5 text-md " fun={() => removeFromCart(product)} />
                  <h2 className='bg-gray-400 w-[10%] ml-1 text-xl text-center rounded-sm'>{count}</h2>
                
                <AddToCartButton className=" text-md " fun={()=>addTocart(product) }  />
            
               </div>}</div>
               <div>
             <h2 className='font-semibold mt-4'>
  Total Price: ${count>0 ? (Number(discountedPrice)* count).toFixed(2) : 'N/A'}
</h2>

               </div>
               <div><p className='mt-4 text-md text-left'>{product?.description}</p></div>
             
             
        </div>
      </div>
      <div className='md:col-span-5 border-blue-200 border-1' ></div>
    </div></div>
  )
}

// export default page
