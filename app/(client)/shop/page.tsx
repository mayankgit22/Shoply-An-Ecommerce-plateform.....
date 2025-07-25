"use client";
import Container from "@/components/ui/Container";
import React, { useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Image from "next/image";
import AddToWish from "@/components/ui/AddToWish";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";
import { StarIcon,Flame } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/ui/AddToCartButton";
import  {  useFilter } from "@/components/ui/FilterContext";
import FilterUI from "@/components/ui/FilterUi";
import { useCart } from "../Context";
export default  function ShopPage() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
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
const [filterProducts,setFilterProducts]=React.useState<Product[]>([])
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


   
 fetchProducts()
 
},[])

const {cartMap,setCartMap,wishMap,setWishMap} =useCart();
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
// const addItem = (product: Product) => {
//   alert('Item added to cart'+{product});
// };
const {category,deal,price,availability}=useFilter();
// console.log(`category: ${category}, deal: ${deal}, price: ${price}, availability: ${availability}hello`);

useEffect(()=>{
const filteredProducts = products.filter((product) => {
  // console.log(deal.toLowerCase())
  if(category.toLowerCase() === "all" && deal.toLowerCase() === "all" && price.toLowerCase() === "all" && availability.toLowerCase() === "all"){
    return product
  }
   if (
    category !== "All" &&
    !product.categories?.some((cat) =>
      cat.toLowerCase().includes(category.toLowerCase())
    )
  ) {
    return false;
  }
    if ( product?.stock && availability === "instock" && product?.stock <= 0) return false;
  if (  product?.stock && availability === "outofstock" && product?.stock > 0) return false;
    if (deal !== "All" && product.status !== deal) return false;
      const p = product.price;
  if (price !== "All") {
    const value = parseInt(price);
    if (price.endsWith("+") && p! <= value) return false;
    if (price.endsWith("-") && p! >= value) return false;
  }
    return true;
  
 

});

setFilterProducts(filteredProducts)

},[category,price,availability,deal,products])

// console.log(filterProducts)


  return (

  <div>
    <Container className="h-auto transition-all duration-500 mb-5" >
      <div className="flex flex-col ">
       <FilterUI />
         <motion.div  initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
            }} className=' 
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  h-auto'>
            {loading ? ( 
            <div className='col-span-full text-center text-2xl'>Loading...</div>
            ) : (
             
            filterProducts.map((product, index) => (
              <div key={index} className='border p-4 relative rounded-lg shadow hover:shadow-lg transition-shadow duration-200'>

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
                <Link href={`/product/${product?._id}`} key={index}>
                   {product?.images && <Image src={urlFor(product?.images[0]).url()} width={200} height={200} className='w-full h-40 object-contain' alt="img"   priority  />}
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
              <div className="relative flex  items-center">
                <div className="flex flex-col">
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
              </h2> </div>
                  <AddToCartButton className="p-1 absolute right-1" fun={() => addTocart(product)} /></div>
                </div>
            )) as React.ReactNode
            )
            }
        </motion.div>
      </div>
     
    </Container>
  </div>
  )
}
