"use client";
import React, { useEffect } from "react";
import { Flame, StarIcon } from "lucide-react";
import HomeBar from "./HomeBar";
import AddToWish from "../ui/AddToWish";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import { motion } from "framer-motion";
import AddToCartButton from "../ui/AddToCartButton";
import Link from "next/link";
import { useCart } from "@/app/(client)/Context";

function ProductGrid() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("gadget");
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
  useEffect(() => {
    const saved = localStorage.getItem("selectedCategory");
    if (saved) setSelectedCategory(saved);
  }, []);


  useEffect(() => {
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);
  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const params = { variant: selectedCategory.toLowerCase() };
        const query = `*[_type == "product" && variant == $variant] | order(name desc) {
        name,
         _id,
        images,
        status,
        stock,
        price,
        discount,
       
        "categories": categories[]->title
        }
`;
        const data = await client.fetch(query, params);

        setProducts(data);
        
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);
  // const discount1=product?.discount as number;
// const discountedPrice=

  return (
    <div>
      <HomeBar
        selectedTab={selectedCategory}
        setSelectedTab={setSelectedCategory}
      />
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
          products.map((product, index) => (
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
    </div>
  );
}

export default ProductGrid;
