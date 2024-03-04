'use client'

import { IonIcon } from '@ionic/react';
import axios from 'axios';
import { checkmarkCircle, checkmarkCircleSharp, checkmarkDone, radioButtonOn } from 'ionicons/icons';
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';



const OrderTrackingPage = () => {
  const trackingID = useSearchParams()
  const [orderStatus, setOrderStatus] = useState(null)

  const [orderNumber, setOrderNumber] = useState(null);
  const [orderNumber1, setOrderNumber1] = useState(null);

  const [inputValue, setInputValue] = useState('');


  const [error1, setError] = useState(null);

  const [isUrl, setIsUrl] = useState(true);




  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/order-status?method=get&orderID=${orderNumber}`);
      if (response.status === 200) {
        setOrderStatus(response.data);
        setError(null)

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(`Invalid Tracking ID : ${orderNumber1}`)

      setOrderNumber(null)
      setIsUrl(false)
    }
  };


  useEffect(() => {
    const id = trackingID?.get("track-order") || null;
    setOrderNumber(id);
    setOrderNumber1(id);


    if (id === null) {
      setIsUrl(false)

    }

  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTrackOrder = () => {
    setOrderNumber(inputValue);
    setOrderNumber1(inputValue);
  };

  useEffect(() => {

    if (orderNumber !== null && orderNumber1 !== null) {
      fetchData();
    }

  }, [orderNumber, orderNumber1]);




  return (
    <>

      {(orderNumber && !error1) ?
        (<div className="bg-white -mt-10 md:mt-0">
          <div className="md:p-5 p-8">
            <h1 className="text-4xl text-center font-semibold mb-6 ml-5">Package Status</h1>
            <div className="container flex flex-col justify-center lg:w-1/3 ml-auto mr-auto">
              <div className="flex flex-col md:grid grid-cols-12 ">

                {orderStatus?.orderStatus?.map((status, idx) => (

                  <div className={`flex md:contents ${status?.status === "green" ? "text-gray-50" : "text-gray-800"}`} key={idx}>
                    <div className="col-start-2 col-end-4 mr-10 md:mx-auto relative">

                      <div className="h-full w-6 flex items-center justify-center">
                        <div className={`h-full w-1 ${status?.status === "green" ? "bg-green-600" : "bg-gray-300"} pointer-events-none`}></div>
                      </div>

                      <div className={`w-7 h-7 absolute top-1/2 -mt-3 rounded-full shadow text-center ${status?.status === "green" ? "bg-green-500" : "bg-gray-300"}`} >
                        {status?.icon === "check" ? (
                          <IonIcon icon={checkmarkCircleSharp} className="mt-1  text-xl font-bold"></IonIcon>
                        ) : status?.icon === "ping" ? (
                          <div>
                            <IonIcon icon={checkmarkCircleSharp} className="absolute right-1 top-1 text-xl font-bold"></IonIcon>
                            <span className="flex h-4 w-4">
                              <span className="motion-safe:animate-ping duration-1000 absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-90"></span>

                            </span>

                          </div>

                        ) : (null)}

                      </div>

                    </div>
                    <div className={`${status?.status === "green" ? "bg-green-500" : "bg-gray-100"} col-start-4 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full`}>
                      <h3 className="font-semibold text-lg mb-1">{status?.title}</h3>
                      <p className="leading-tight text-justify w-full">
                        {status?.date}
                        <br />
                        {status?.description}

                      </p>
                    </div>
                  </div>

                ))}

              </div>
            </div>

            {orderStatus?.orderStatus?.[2]?.status === "green" ? (
              <div className="mt-5 w-full mx-4 lg:mx-0 flex  justify-center items-center">
                <div className="w-3/4 lg:w-1/3 text-lg text-center flex flex-col tracking-wider leading-7  p-4 rounded-md shadow-md">
                  <h2 className="text-xl font-bold mb-2">Order Delivered Successfully!</h2>
                  <p>
                    Your order <span className="font-semibold">{orderStatus?.orderID}</span> has been delivered. Enjoy your purchase!
                  </p>
                  <p>
                    Need assistance? Contact our support team. Thank you for choosing <span className="font-semibold">RAGE&apos;s AGRIHELP</span>!
                  </p>
                </div>
              </div>

            ) : (null)}


          </div>
        </div>
        ) : (
          <div className={`flex justify-center items-center mt-56 bg-white ${isUrl ? "opacity-0" : "opacity-100"}`}>
            <div className="bg-white p-8 rounded-lg shadow-lg md:w-full w-10/12 max-w-xl border border-gray-300">
              <h1 className="text-4xl font-semibold mb-6 text-gray-800">Track Your Order</h1>
              <div className="mb-6">
                <label htmlFor="orderNumber" className="text-lg font-medium text-gray-600 block mb-2">
                  Order Number
                </label>
                <input
                  type="text"
                  id="orderNumber"
                  className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                  placeholder="Enter your order number"
                  value={orderNumber}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="w-full bg-teal-800 text-white py-4 rounded-md hover:bg-teal-600 transition duration-300"
                onClick={handleTrackOrder}
              >
                Track Order
              </button>
              {(error1 && orderNumber1) ? <span className='text-red-500 flex w-full justify-center animate-pulse  duration-[8000ms]  py-4 text-xl'>{error1}</span> : null}
            </div>
          </div>)}



    </>
  );
};

export default OrderTrackingPage;




