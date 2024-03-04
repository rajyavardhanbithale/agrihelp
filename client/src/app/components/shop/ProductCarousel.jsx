import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "../../App.css"
import Link from 'next/link';
function ProductCarousel() {
  const images = [
    '/assets/shop/shop1.webp',
    '/assets/shop/shop2.webp',
    '/assets/shop/shop3.webp',
    '/assets/shop/shop4.webp',
    '/assets/shop/shop5.webp',
    '/assets/shop/shop6.webp'

  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,      // Enable autoplay
    autoplaySpeed: 4000, // Set the interval (in milliseconds)


  };
  return (
    <div className="relative">
      {/* <img
        className="w-full object-cover brightness-50 filter lg:h-[500px]"
        src="assets/Carousel.jpeg"
        alt="ProductCarousel"
      /> */}
      <Slider {...settings}>
        {images.map((image, index) => (
         
            <img key={index} src={image} alt={`Slide ${index + 1}`} className="w-full h-1/2 object-cover brightness-[0.3] filter lg:h-[500px]" />
         
        ))}
      </Slider>

      <div className="absolute top-1/2 left-1/2 mx-auto flex w-11/12 max-w-[1200px] -translate-x-1/2 -translate-y-1/2 flex-col text-center text-white lg:ml-5">
        <h1 className="text-4xl font-bold sm:text-5xl lg:text-left">
          Best Product &ldquo;Farmer&apos;s Choice&ldquo;
        </h1>
        <p className="md:block hidden pt-3 text-xs lg:w-3/5 lg:pt-5 lg:text-left lg:text-base">
          &ldquo;Farmer&apos;ss Choice&ldquo; offers superior agricultural products,
          handpicked by dedicated farmers. Embrace the exceptional quality and
          freshness of our carefully cultivated selection, delivering the essence
          of premium farming to your table.
        </p>
        <Link href={"/shop/search"}>

        <button className="mx-auto mt-5 w-1/2 bg-teal-800 rounded-xl md:p-5 p-3 text-gray-50 transition duration-500 flex items-center  hover:bg-teal-600 lg:mx-0 lg:h-10 lg:w-2/12 justify-center">
          Order Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCarousel;