import "../globals.css";
import  Header  from "@/components/ui/Header";
import  Footer  from "@/components/ui/Footer";
import { ClerkProvider } from "@clerk/nextjs";
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>

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
       </ClerkProvider>
  );
}
