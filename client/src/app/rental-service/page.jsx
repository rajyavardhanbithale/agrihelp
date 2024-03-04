'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

const ShopHeader = dynamic(() => import('../components/rental/ShopHeader'));
const Shopbox = dynamic(() => import('../components/rental/Shopbox'));
const ProductCarousel = dynamic(() => import('../components/rental/ProductCarousel'));
const Category = dynamic(() => import('../components/rental/Category'));
const PromoSection = dynamic(() => import('../components/rental/PromoSection'));
// const RentalProductCard = dynamic(() => import('../components/rental/RentalProductCard'));
import  RentalProductCard from '../components/rental/RentalProductCard'

export default function Shop() {
  const [error,setError] = useState()


  return (
    <>
      <ShopHeader />
      <ProductCarousel />
      <Shopbox />
      <Category />
      <PromoSection />
      <RentalProductCard width={80} path={"rental-service/product/"} title={"Machinery"} totalItem={10} category={"machinery"} />
      <RentalProductCard width={80} path={"rental-service/product/"} title={"Equipment"} totalItem={10} category={"equipment"} />

      {/* <ShopFooter /> */}

    </>
  );
}

