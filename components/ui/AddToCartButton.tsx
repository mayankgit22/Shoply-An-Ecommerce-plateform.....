
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import React from 'react'

 export default  function AddToCartButton({ className, fun,stock }: { className: string, fun?: () => void ,stock?:number }) {
  return (
    <button className={className} onClick={fun} disabled={stock===0}  >
      <PlusCircleIcon className='w-8 h-8' />
    </button>
  )
}

 export  function RemoveCartButton({ className, fun }: { className: string, fun?: () => void }) {
 return (
    <button className={className} onClick={fun} >
      <MinusCircleIcon  className='w-8 h-8' />
    </button>
  )
}


