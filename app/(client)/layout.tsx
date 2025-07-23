import "../globals.css";
import  Header  from "@/components/ui/Header";
import  Footer  from "@/components/ui/Footer";

import {Contextshare}from '../(client)/Context'
import { FilterProvider } from "@/components/ui/FilterContext";
export const metadata = {
  title: "Shoply:Your Online Shopping Partner",
  description: "Be free to shop from anywhere",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


      <FilterProvider>
   <Contextshare>

    <html lang="en">

      <body
     className="font-poppins antialiased " >
      <Header />
        {children}
        <Footer/>
      </body>
    </html></Contextshare>
      </FilterProvider>
  
  );
}
