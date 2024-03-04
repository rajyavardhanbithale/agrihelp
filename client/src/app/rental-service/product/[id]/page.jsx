'use client'
import { useParams } from "next/navigation"

import { useEffect, useState } from "react";
import axios from "axios";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { IonIcon } from "@ionic/react";
import { callOutline, cart } from "ionicons/icons";

import ShopHeader from "@/app/components/shop/ShopHeader";
import RentModal from "@/app/components/rental/RentModal";
import RentalProductCard from "@/app/components/rental/RentalProductCard";



export default function Product() {
  const productId = useParams();

  const [data, setData] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/rental-product?productID=${productId.id}`)
        if (response.status === 200) {
          setData(response.data)
        }

      } catch (error) {

      }
    }

    fetchProduct()

  }, [])

  const images = [
    data?.images?.[0],
    data?.images?.[1]

  ];

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i + 1}`} />

        </a>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots1 slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const handleBook = () => {
    openModal()
  }

  

  return (
    <>
      <ShopHeader />

      {(images && data) ? (
        <div>
          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            <div className="container mx-auto px-5">
              <Slider {...settings}>
                {images.map((image, index) => (
                  <div key={index} className="w-full flex items-center outline-none justify-center h-full">
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-96 object-contain outline-none"
                    />
                  </div>
                ))}
              </Slider>
            </div>


            <div className="mx-auto px-5 mt-32 sm:mt-32  lg:mt-0 lg:px-5">
              <h2 className="pt-3 text-2xl font-bold lg:pt-0">{data?.name}</h2>
              <div className="mt-1">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4 text-yellow-400"
                  >
                    {/* SVG path */}
                  </svg>

                  {/* Add more SVG elements as needed */}
                  <div className="flex items-center text-xl">
                    {data?.rating && [...Array(Math.round(parseFloat(data?.rating)))].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4 text-emerald-800"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                    <p className="text-lg text-gray-400">&nbsp; {data?.rating}</p>
                  </div>

                </div>
              </div>


              <div>
                <div className="grid grid-cols-2"> 
                  <div>

                    <p className="mt-5 font-bold mb-2">
                      Brand: &nbsp;<span className="text-green-600">{data?.brand}</span>
                    </p>
                    <p className="font-bold mb-2">
                      Owner: &nbsp;<span className="font-normal">{data?.owner}</span>
                    </p>
                    <p className="font-bold mb-2">
                      Category: &nbsp;<span className="font-normal">{data?.categories?.[0]}</span>
                    </p>
                    <p className="font-bold mb-2">
                      PID: &nbsp;<span className="font-normal">{data?.productId}</span>
                    </p>

                    <p className="mt-4 text-4xl font-bold text-teal-900">
                      &#8377; {data?.rental} <span className="text-2xl text-gray-400">/hr</span>
                    </p>
                  </div>
                  <div>
                    <div className="lg:hidden -mt-5">
                      {data?.availability ? (
                        <img src="/assets/avail.jpg" alt="" className="w-[70%]" />
                      ) : ( <img src="/assets/notavail.jpeg" alt="" className="w-[70%]" />)}
                      
                    </div>
                  </div>

                </div>
                <p className="pt-5 text-lg leading-5 text-gray-900">
                  {data?.description}
                </p>

                <div className="mt-6">
                  <p className="pb-2 text-lg text-gray-900 font-bold">Total Rental : {data?.totalrental}</p>


                </div>

                <div className="mt-6">
                  <p className="pb-2 text-lg text-gray-900 font-bold">Location : {data?.Location}</p>

                </div>
              </div>


              <div onClick={handleBook} className="mt-7 flex flex-row items-center gap-6 justify-center ">
                <button className="flex h-12 p-6 w-2/3 rounded-xl items-center justify-center bg-teal-700 text-white duration-100 hover:bg-teal-800">
                  <IonIcon
                    icon={callOutline}
                    className="text-2xl text-teal-300 px-2"
                  />
                  Book
                </button>

              </div>
              <RentModal isOpen={isModalOpen} closeModal={closeModal} itemName={data?.name} />
            </div>
          </section>
          {/* <ProductDetails /> */}
          <RentalProductCard width={80} path={""} title={"Machinery"} totalItem={10} category={"machinery"} />
          <RentalProductCard width={80} path={""} title={"Equipment"} totalItem={10} category={"equipment"} />
        </div>
      ) : (
        <div>
          <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:py-10">
            <div className="container mx-auto px-5 h-96 bg-gray-200 rounded-2xl animate-pulse">
            </div>

            <div className="mx-auto px-5 mt-32 sm:mt-32  lg:mt-0 lg:px-5">
              <h2 className="pt-3 text-2xl font-bold lg:pt-0 w-80 h-7 text-transparent bg-gray-200 rounded-2xl animate-pulse"></h2>
              <div className="mt-3">
                <div className="flex items-center w-52 h-5 text-transparent bg-gray-200 rounded-2xl animate-pulse">

                </div>
              </div>

              <p className="mt-5 font-bold mb-2 w-48 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-48 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-44 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-56 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-52 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-44 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-40 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-48 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-32 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <p className="mt-5 font-bold mb-2 w-36 h-4 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>
              <div className="mt-7 flex flex-row items-center gap-6 justify-center ">
                <p className="mt-5 font-bold mb-2 w-64 h-6 text-transparent bg-gray-200 rounded-2xl animate-pulse"> </p>

              </div>

            </div>
          </section>

        </div>
      )}


    </>
  );
}



