'use client'
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'

const ShopHeader = dynamic(() => import('../components/shop/ShopHeader'));
const Shopbox = dynamic(() => import('../components/shop/Shopbox'));
const ProductCarousel = dynamic(() => import('../components/shop/ProductCarousel'));
const Category = dynamic(() => import('../components/shop/Category'));
const PromoSection = dynamic(() => import('../components/shop/PromoSection'));
// const ProductCard = dynamic(() => import('../components/shop/ProductCard'));
import ProductCard from '../components/shop/ProductCard'

export default function Shop() {
  const [error,setError] = useState()


  return (
    <>
      <ShopHeader />
      <ProductCarousel />
      <Shopbox />
      <Category />
      <PromoSection />
      <ProductCard width={80} path={"shop/product/"} title={"Seeds"} totalItem={6} category={"seeds"} />
      <ProductCard width={80} path={"shop/product/"} title={"Fertilizer"} totalItem={6} category={"fertilizer"} />

      {/* <ShopFooter /> */}

    </>
  );
}

