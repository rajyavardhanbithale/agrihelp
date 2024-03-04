'use client'
import { IonIcon } from '@ionic/react';
import { cardOutline, caretForwardOutline, mail, mailOutline, personOutline, tabletLandscapeOutline } from 'ionicons/icons';
import React, { use, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';



export default function Checkout() {
  const [shippingData, setShippingData] = useState({});
  const [order, setOrder] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [user, setUser] = useState(null);
  const [orderID, setOrderID] = useState(null);

  const handleOrderTotalChange = (total) => {
    setShippingData(total);
  };

  const handleOrder = (total) => {
    setOrder(total);
  };

  const handleUser = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/place-order`, shippingData)

        if (response.status == 200) {

          setOrderID(response.data.detail.orderID)
          setConfirmOrder(true)
        }
      } catch (error) {

      }
    }

    postData()

  }, [order])



  return (
    <>
      {!confirmOrder ? <OrderSummary onOrderTotalChange={handleOrderTotalChange} onOrder={handleOrder} onUser={handleUser} /> : <OrderConfirmation user={user} orderid={orderID} ></OrderConfirmation>}

      {/* <OrderConfirmation ></OrderConfirmation> */}

    </>
  );
};


function OrderSummary(props) {
  const [user, setUser] = useState(null)
  const [jsonData, setJson] = useState(null)
  const [delivery, setDelivery] = useState(null)
  const [deliveryMet, setDeliveryMet] = useState({})

  const [formError, setFormError] = useState(null);

  const [selectedState, setSelectedState] = useState('');

  const [formData, setFormData] = useState({
    cardHolderName: '',
    billingAddress: '',
    zip: '',
  });


  const [data, setData] = useState(null)
  const [productData, setProductData] = useState([]);
  const [total, setTotal] = useState(0);


  const stateArr = [
    "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"
  ];

  useEffect(() => {
    const key = 'rar';
    const getEncryptedCookie = Cookies.get('user') || null;
    const parseEncryptedCookie = CryptoJS.AES.decrypt(getEncryptedCookie, key).toString(CryptoJS.enc.Utf8);
    const jsonDecrypt = JSON.parse(parseEncryptedCookie);
    setJson(jsonDecrypt)

  }, [])



  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get-user`, jsonData);
        const response1 = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/delivery`);

        if (response.status === 200) {
          setUser(response.data);
          setDelivery(response1.data);
          setDeliveryMet(response1?.data?.[0]?.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the async function

  }, [jsonData]);


  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mandatoryFields = ["cardHolderName", "billingAddress", "zip"];

    const missingFields = mandatoryFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      console.error(`Please fill in the following fields: ${missingFields.join(', ')}`);
      return;
    }

    const postRequest = {
      fullname: `${user?.firstname} ${user?.lastname}`,
      email: user?.email,
      cardHolderName: formData.cardHolderName,
      billingAddress: formData.billingAddress,
      state: selectedState,
      zip: formData.zip,
      deliveryMethod: deliveryMet,
      orderCart: data,

    }


    handleQuantityChange(postRequest)
    handleOrder()
    handleUsers()
  };

  const handleQuantityChange = (request) => {
    props.onOrderTotalChange(request);
  };

  const handleOrder = () => {
    props.onOrder(true);
  };

  const handleUsers = () => {
    props.onUser(user);

  };




  useEffect(() => {
    const fetchDataForProduct = async (productId) => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-product?productID=${productId}`);
        if (response.status === 200) {
          const productInfo = response.data;
          setProductData((prevData) => [...prevData, productInfo]);
        } else {
          console.error(`Failed to fetch data for product ID: ${productId}`);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const fetchData = async () => {

      if (data?.length > 0) {

        await Promise.all(data?.map((productId) => fetchDataForProduct(productId)));
      }
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    // Move setData outside the effect
    const cookie = Cookies.get('shop');
    const cookieData = JSON.parse(cookie || '[]');
    setData(cookieData);
  }, []);


  useEffect(() => {
    const totalPrice = productData.reduce((acc, element) => acc + element.price, 0);
    setTotal(totalPrice.toFixed(2));

  }, [productData]);



  const handleSelectChange = (event) => {
    if (event && event.target) {
      const selectedValue = event.target.value;
      setDeliveryMet(selectedValue)
    }
  };


  return (
    <>

      <div className="flex flex-col items-center border-b bg-white sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <img
          className="cursor-pointer w-16"
          src="/assets/nav.png"
          alt="company logo"
        />
        <a href="#" className="text-2xl font-bold text-gray-800">&nbsp; AGRIHELP</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex md:w-full w-[90%] items-center justify-center mx-auto space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white " href="#">1</a>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <IonIcon icon={caretForwardOutline}></IonIcon>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
              <IonIcon icon={caretForwardOutline}></IonIcon>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" href="#">3</a>
                <span className="font-semibold text-gray-900">Confirmation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>


      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

            {productData.map((item, idx) => (
              <div key={idx}>

                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item?.images?.[0]} alt="" />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item?.name}</span>
                    <span className="float-right text-gray-400">Quantity - 1 qty</span>
                    <p className="text-lg font-bold">₹ {item?.price}</p>
                  </div>
                </div>
              </div>


            ))}


          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">

            {delivery?.map((item, idx) => (
              <div className="relative" key={idx}>
                <input
                  className="peer hidden"
                  id={`radio_${idx}`}
                  type="radio"
                  name="deliveryOption"
                  onChange={handleSelectChange}
                  value={item?.id}
                  defaultChecked={idx === 0}
                />
                <span className="peer-checked:border-teal-800 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-teal-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor={`radio_${idx}`}
                >
                  <img className="w-14 object-contain" src={item?.image} alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">{item?.name}</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: {item?.freeDelivery} Days</p>
                  </div>
                </label>
              </div>
            ))}



          </form>
        </div>

        <form onSubmit={handleSubmit}>


          <div className="flex justify-center align-middle mt-20">

            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0 ">
              <p className="text-xl font-medium">Payment Details</p>
              <p className="text-gray-400">Complete your order by providing your payment details.</p>
              <div className="">

                <label for="fullName" className="mt-4 mb-2 block text-sm font-medium">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    className="capitalize w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    value={`${user?.firstname} ${user?.lastname}` || ''}


                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <IonIcon icon={personOutline}></IonIcon>
                  </div>
                </div>

                <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    value={user?.email || ''}

                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <IonIcon icon={mailOutline}></IonIcon>
                  </div>
                </div>

                <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Card Holder</label>
                <div className="relative">
                  <input
                    id="card-holder"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your full name here"
                    type="text"
                    name="cardHolderName"
                    value={formData.cardHolderName}
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <IonIcon icon={cardOutline}></IonIcon>
                  </div>
                </div>

                <label for="card-no" className=" mt-4 mb-2 block text-sm font-medium">Card Details</label>
                <div className="flex gap-5">
                  <div className="relative w-7/12 flex-shrink-0">
                    <input type="text" id="card-no" name="card-no" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <IonIcon icon={tabletLandscapeOutline}></IonIcon>
                    </div>
                  </div>

                  <input type="text" name="credit-expiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" />
                  <input type="text" name="credit-cvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" />
                </div>


                <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>


                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="relative flex-shrink-0 sm:w-7/12">
                    <input
                      id="billing-address"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Street Address"
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}

                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/43d56f605a4ad41c190b7798a99c53bf.svg" alt="" />
                    </div>
                  </div>
                  <select
                    id="state"
                    name="state"
                    onChange={handleStateChange}
                    value={selectedState}
                    className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select State</option>
                    {stateArr.map((state, index) => (
                      <option key={index} value={state} className="capitalize">
                        {state}
                      </option>
                    ))}
                  </select>

                  <input
                    id="billing-zip"
                    className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="ZIP"
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>


                <div className="mt-12 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">₹ {total}</p>
                </div>
              </div>


              <button type='submit' className="mt-4 mb-8 w-full rounded-md bg-teal-900 px-6 py-3 font-medium text-white">Place Order</button>
            </div>
          </div>
        </form>
      </div>


    </>
  )
}


function OrderConfirmation(props) {
  const [jsonData, setJson] = useState();



  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <img
          className="cursor-pointer w-16"
          src="/assets/nav.png"
          alt="company logo"
        />
        <a href="#" className="text-2xl font-bold text-gray-800">&nbsp; AGRIHELP</a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex md:w-full w-[90%] items-center justify-center mx-auto space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white " href="#">1</a>
                <span className="font-semibold text-gray-900">Cart</span>
              </li>
              <IonIcon icon={caretForwardOutline}></IonIcon>

              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white " href="#">2</a>
                <span className="font-semibold text-gray-900">Checkout</span>
              </li>
              <IonIcon icon={caretForwardOutline}></IonIcon>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">3</a>
                <span className="font-semibold text-gray-900">Confirmation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <section className="mt-20 px-4">
          <div className="flex flex-col gap-4">
            <p className="capitalize text-center text-3xl font-bold">
              We Accepted Your Order
            </p>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="mx-auto my-3 h-[80px] w-[80px] text-teal-500 shake-once"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>

              <p>Thank you, <span className="font-bold capitalize">  {props?.user?.firstname} {props?.user?.lastname}</span></p>
              <p>You can check your order status on your orders list!</p>
              <p>Order ID : {props?.orderid}</p>

              <Link href={`/shop/tracking?track-order=${props?.orderid}`}>
                <div className="mt-10">
                  <span

                    className="mx-auto bg-teal-800 text-white px-5 rounded-lg py-3"
                  >
                    Track Order
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </section>
      </div>

    </>
  )

}