import HomeBanner from "@/components/Home/HomeBanner";
import ProductGrid from "@/components/Home/ProductGrid";
import  Container  from "@/components/ui/Container";

export default function Home() {
  
  return (
   <>
   
   <Container className="h-auto" >
    
<HomeBanner/>
<div className="py-6 px-1">

<ProductGrid/>
</div>

   </Container>
</>
  );
}
