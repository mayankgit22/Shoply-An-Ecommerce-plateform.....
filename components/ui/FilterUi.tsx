"use client"
import { useEffect } from "react";
import {useFilter} from "./FilterContext"

export default function FilterUI() {
  const {price, setPrice, deal, setDeal, availability, setAvailability } =useFilter();
// const { category } = useFilter();

useEffect(() => {
  console.log("Category changed:", category);
}, [category]);


  return (
    
    <div className="mb-3 grid grid-cols-1 gap-6   text-sm md:text-lg items-center md:grid-cols-4">
      <label htmlFor="category">Choose category:</label>
{/*       <select onChange={(e) => setCategory(e.target.value )} value={category} id="category">
        <option value="All">ALL</option>
        <option value="gadget">Gadget</option>
        <option value="appliances">Appliances</option>
        <option value="refrigerators">Refrigerators</option>
        <option value="other">Other</option>
      </select> */}

      <label htmlFor="price">Choose price:</label>
      <select onChange={(e) => setPrice(e.target.value )} value={price} id="price">
        <option value="All">ALL</option>
        <option value="100-">Under 100</option>
        <option value="100+">Over 100</option>
        <option value="500-">Under 500</option>
        {/* <option value="500+">Over 500 and Under 1000</option> */}
        <option value="1000-">Under 1000</option>
        <option value="1000+">Over 1000</option>
      </select>

      <label htmlFor="availability">Choose availability:</label>
      <select onChange={(e) => setAvailability(e.target.value)} value={availability} id="availability">
        <option value="All">ALL</option>
        <option value="instock">In stock</option>
        <option value="outofstock">Out of stock</option>
      </select>

      <label htmlFor="deal">Choose deal:</label>
      <select onChange={(e) => setDeal(e.target.value )} value={deal} id="deal">
        <option value="All">ALL</option>
        <option value="hot">Hot</option>
        <option value="sale">Sale</option>
        <option value="new">New</option>
      </select>
    </div>
  )
}
