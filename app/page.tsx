import React from "react";
import Oakit from "@/components/component/Oakit";
import "./globals.css";
import Hero  from "@/components/Hero";
import ContactUs from "@/components/ContactUs";


export default function Home() {
    return (

<main className="flex flex-col items-center" >
  
  <Hero />
  <Oakit />
  <ContactUs />
  
  
 </main>   
  )
}
