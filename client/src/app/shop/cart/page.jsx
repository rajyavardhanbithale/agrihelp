'use client'
import ShopHeader from '@/app/components/shop/ShopHeader';
import { IonIcon } from '@ionic/react';
import axios from 'axios';
import { cartOutline, cart, caretForward, caretForwardOutline } from 'ionicons/icons';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';



export default function Cart() {

    const [data, setData] = useState(null)
    const [productData, setProductData] = useState([]);
    const [total, setTotal] = useState(0);
    const [fakeTotal, setFakeTotal] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

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

        const totalPrice1 = productData.reduce((acc, element) => acc + element.originalPrice, 0);
        setFakeTotal(totalPrice1.toFixed(2));
    }, [productData]);


    function removeFromCart(productId) {
        setIsHidden(true);


        // Get the current list from the cookie
        const existingList = JSON.parse(Cookies.get('shop') || '[]');

        // Check if the product ID is in the list
        const productIndex = existingList.indexOf(productId);

        if (productIndex !== -1) {
            // If the product is in the list, remove it
            const updatedList = [...existingList.slice(0, productIndex), ...existingList.slice(productIndex + 1)];

            // Set the updated list back in the cookie
            Cookies.set('shop', JSON.stringify(updatedList));

            const cookie = Cookies.get('shop');
            const cookieData = JSON.parse(cookie || '[]');
            setData(cookieData);
            window.location.href = '/shop/cart'
        } else {
            console.log('Product not found in the cart');
        }
    }


    return (
        <>
            <ShopHeader />
            <div className="flex flex-col items-center border-b mt-10 bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">&nbsp; Shopping Cart Items <IonIcon icon={cart}></IonIcon></a>

                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">

                    <div className="relative">
                        <ul className="relative flex md:w-full w-[90%] items-center justify-center mx-auto space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">1</a>
                                <span className="font-semibold text-gray-900">Cart</span>
                            </li>
                            <IonIcon icon={caretForwardOutline}></IonIcon>

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a className="flex md:h-6 md:w-6 h-4 w-4 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white" href="#">2</a>
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

            <section className={`md:flex mt-10 ${isHidden ? 'opacity-0' : 'opacity-100'}`}>
                <section className="w-full md:h-[600px] md:w-full md:max-w-[1200px] md:grid-cols-1 gap-3 px-5 pb-10 md:grid">
                    {/* <div className="m-5">
                        <span className="text-4xl font-bold tracking-wide">Shopping Cart Items <IonIcon icon={cart}></IonIcon></span>
                        <hr />
                    </div> */}

                    {data === null && (
                        <div className="mt-28 flex flex-col items-end justify-end">
                            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-md text-center">
                                <h1 className="text-3xl font-semibold mb-4">Empty Cart</h1>
                                <p className="text-gray-600 mb-8">There&apos;s nothing to show on this page.</p>
                                <IonIcon icon={cartOutline} className="text-9xl text-teal-600"></IonIcon>
                                <br />
                                <br />
                                <button className="bg-teal-900 text-white px-4 py-2 rounded-md">
                                    Create Something
                                </button>
                            </div>
                        </div>

                    )}

                    <table className="w-full">
                        <tbody>
                            {productData.map((item, idx) => (

                                <tr className="h-[100px]" key={idx}>
                                    <td className="flex w-full border px-4 py-4">
                                        <img
                                            className="self-start object-contain"
                                            width="90px"
                                            src={item?.images?.[0]}
                                            alt="Chair image"
                                        />
                                        <div className="ml-3 flex w-full flex-col justify-center">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-bold">{item?.name}</p>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="text-sm py-2 text-gray-400">Description: {item?.description}</p>
                                            <p className="py-3 text-xl font-bold text-teal-800">&#8377;{item?.price}</p>
                                            <div className="mt-2 flex w-full items-center justify-between">
                                                <div className="flex items-center justify-center">

                                                </div>
                                                <div onClick={() => removeFromCart(item?.productId)}>

                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="m-0 h-5 w-5 cursor-pointer"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}


                        </tbody>
                    </table>


                </section>

                {data !== null && (
                    <section className="mx-auto w-full px-4 md:max-w-[400px] m-20">
                        <div className="">
                            <div className="border py-5 px-4 shadow-md">
                                <p className="font-bold">ORDER SUMMARY</p>
                                {/* Summary details */}
                                <div className="flex justify-between border-b py-5">
                                    <p>Subtotal</p>
                                    <p>₹ {fakeTotal}</p>
                                </div>
                                <div className="flex justify-between border-b py-5">
                                    <p>You Save</p>
                                    <p>₹ {(fakeTotal - total).toFixed(2)}</p>
                                </div>
                                <div className="flex justify-between border-b py-5">
                                    <p>Shipping</p>
                                    <p>{total >= 200 ? "Free" : "₹ 200"}</p>
                                </div>
                                <div className="flex justify-between py-5">
                                    <p>Total</p>
                                    <p>₹ {total}</p>
                                </div>
                                {/* Button */}
                                <Link href="/shop/checkout">
                                    <button className="w-full rounded-xl bg-teal-900 px-5 py-2 text-white">
                                        Proceed to checkout
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

            </section>

        </>
    );
}
