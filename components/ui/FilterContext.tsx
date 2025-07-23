// context/FilterContext.tsx
"use client"
import { createContext, useContext, useState } from "react"
import type { FilterState } from "../../lib/types" // if you moved it to a separate file

const FilterContext = createContext<FilterState | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("All")
  const [price, setPrice] = useState("All")
  const [deal, setDeal] = useState("All")
  const [availability, setAvailability] = useState("All")

  return (
    <FilterContext.Provider value={{category,price,deal,availability,setCategory,setPrice,setDeal,setAvailability}}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)
  if (!context) throw new Error("useFilter must be used within a FilterProvider")
  return context
}
