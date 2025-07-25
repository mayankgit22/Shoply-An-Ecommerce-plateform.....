"use client"
import React,{useEffect, useState} from 'react'
import { Product } from '@/sanity.types'
import { client } from '@/sanity/lib/client'

import { Flame, StarIcon } from "lucide-react";
import { useCart } from '../Context';
import AddToWish from "../../../components/ui/AddToWish";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/ui/AddToCartButton";
import Link from "next/link";
function Page() {
  const [hotDealsProducts,setHotDealsProducts]=useState<Product[]>([])
  const[loading,setLoading]=useState(false);
  const{wishMap,setWishMap,cartMap,setCartMap}=useCart();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`
          *[_type == "product"] | order(name desc) {
            name,
            _id,
            images,
            status,
            stock,
            price,
            discount,
            "categories": categories[]->title
          }
        `);  
        setHotDealsProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      finally{
        setLoading(false);
      }
    };
    fetchProducts();
  },[])
  const addTocart=async(product:Product)=>{
  
    const stock=product?.stock as number;
    const id=product?._id;
    const productCount=cartMap.get(id);
  if(productCount!>=stock) {
    alert('Can not add more than available stock');
     return ;}
  //  setCount(prev=>prev+1);
  // console.log(id)
  
    // const cartItem = cartMap.get(id);
    // console.log(cartItem)
    if(!productCount || productCount===0)setCartMap(prev => {
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
  const addToWish=(product:Product)=>{
    const id=product?._id;
    const wishItem = wishMap.get(id);
    if(!wishItem || wishItem===0)setWishMap(prev => {
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
  const productsHot=hotDealsProducts.filter((product)=>product?.status==="hot")
  console.log(hotDealsProducts)
  return (
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.7,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 h-auto bg-gray-100 rounded-2xl mt-4"
      >
        {loading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : (
          productsHot.map((product, index) => (
            <div
              key={index}
              className="border h-auto relative p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer  duration-200"
            >
              <AddToWish fun={()=>addToWish(product)} product={product} className="absolute top-2 let-2" />
              {product?.status === "sale" && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Sale!
                </span>
              )}
              {product?.status === "hot" && (
                <span className="absolute top-2 right-2 border-2 border-orange-500  text-orange-500 text-xs   py-1 px-1 rounded-full">
                  <Flame fill="#fb6c08" className="w-4 h-4 inline" />
                </span>
              )}
              {product?.status === "new" && (
                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  New
                </span>
              )}
                  <Link key={index} href={`/product/${product._id}`}>
              {product?.images && (
                <Image
                  src={urlFor(product?.images[0]).url()}
                  width={200}
                  height={200}
                  className="w-full h-40 object-contain"
                  alt="img"
                    priority 
                />
              )}
                                             <p className='text-sm uppercase text-gray-500'>{product?.categories?.join(", ")}</p>

              <h3 className="text-md font-normal">
                {product.name && product?.name?.length > 30
                  ? product?.name?.slice(0, 28) + "..."
                  : product.name}
              </h3>
              <div className="flex mt-1">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    size={15}
                    className="text-shop_light_green"
                    fill={"#3b9c3c"}
                  />
                ))}
                
              </div></Link>
              <h2 className="mt-2">
                {(product.stock as number) && product?.stock == 0
                  ? "Out of stock"
                  : product?.stock
                    ? `In stock ${product?.stock} `
                    : "Loading..."}{" "}
              </h2>
              {product?.stock as number &&
              <div className=" relative w-full">
                <AddToCartButton className="absolute right-2" fun={() => addTocart(product)} />
            
              <h2 className="text-lg font-semibold mt-2">
                {product?.price
                  ? `$${(
                      product?.price -
                      (product?.price * (product?.discount as number)) / 100
                    ).toFixed(2)}`
                  : "Price not available"}
              </h2>
              <h2 className="text-sm font-mormal mt-2 line-through">
                {product?.price
                  ? `$${product?.price.toFixed(2)}`
                  : "Price not available"}
              </h2> 
               </div>}
                
            </div>

          ))
        )}
      </motion.div>
  )
}

export default Page
