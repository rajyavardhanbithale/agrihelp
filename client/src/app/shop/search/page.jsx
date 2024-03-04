'use client'
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { caretDown, caretUp, search } from 'ionicons/icons';
import { useSearchParams } from 'next/navigation';




export default function Search() {
    const searchItem = useSearchParams()?.get("category") || null


    const [item, setItem] = useState([]);
    const [count, setCount] = useState(0);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("seeds");

    useEffect(() => {

        const isValidCategory = category.includes(searchItem);

        if (searchItem && isValidCategory) {
            handleFetch(searchItem);
        } else {
            handleFetch("seeds");
        }


        return () => {
            // Cleanup code here (if needed)
        };
    }, []);

    function calculateDiscountPercentage(buyingPrice, sellingPrice) {
        const discountPercentage = ((buyingPrice - sellingPrice) / buyingPrice) * 100
        return Math.round(discountPercentage.toFixed(2))  // Optionally round to two decimal places

    }

    const filteredProducts = item
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOption === 'lowToHigh') {
                return a.price - b.price;
            } else if (sortOption === 'highToLow') {
                return b.price - a.price;
            } else if (sortOption === 'priceLowToHigh') {
                return a.price - b.price;
            }
            return 0;
        });

    useEffect(() => {
        const timer = setInterval(() => {
            if (count < 300) {
                setCount((prevCount) => prevCount + 1);
            } else {
                clearInterval(timer); // Stop the counter when it reaches 100
            }
        }, 1);



        // Clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, [count]);

    const handleFetch = async (category) => {
        setSelectedCategory(category);

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-item?item=95&category=${category}`);
            if (response.status === 200) {
                setItem(response.data);
               
            }
        } catch (error) {
            console.error(error);
        }

    }

    const category = ["seeds", "fertilizer", "equipment", "pump", "organic", "Pesticide"]


    return (
        <>
            <div className="mx-auto flex justify-center  items-start px-5 mb-5">
                <section className="rounded-2xl mt-5 flex justify-between bg-emerald-900 px-5">
                    <div className="py-5 px-2 lg:px-16">
                        <p className="text-white font-bold">AGRIHELP STORE</p>
                        <p className="text-white font-semibold">Contains More than</p>
                        <h2 className="pt-6 text-4xl font-bold text-green-100">{count} +</h2>
                        <p className="pt-4 text-white text-2xl">
                            Products
                        </p>

                    </div>
                    <img
                        className="ml-20 -mr-5 hidden w-[250px] h-[200px]  object-cover md:block rounded-2xl bg-blend-darken"
                        src="https://cdn.pixabay.com/photo/2020/05/18/11/07/special-sale-5185721_1280.png"
                        alt="Rainbow credit card with macbook on a background"
                    />


                </section>
            </div>


            <div className="bg-white">
                {/* Search Bar */}
                <div className="flex justify-center pt-8">
                    <div className="w-3/6">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full h-10 pl-4 pr-10 text-sm rounded-full focus:outline-none focus:shadow-outline"
                                placeholder="Search products..."
                                value={null}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute top-0 right-0 mt-3 mr-4">
                                <IonIcon icon={search}></IonIcon>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center mt-8 gap-y-4">
                    <select
                        className="block sm:hidden mx-2 px-4 py-2 rounded-full"
                        value={sortOption === null ? "price" : sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="price">Price</option>
                        <option value="lowToHigh">Price Low to High </option>
                        <option value="highToLow">Price High to Low </option>
                    </select>

                    <button
                        className={`hidden sm:inline-block mx-2 px-4 py-2 rounded-full ${sortOption === 'lowToHigh' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortOption('lowToHigh')}
                    >
                        Price Low to High <IonIcon icon={caretUp} className="flex-inline align-middle"></IonIcon>
                    </button>
                    <button
                        className={`hidden sm:inline-block mx-2 px-4 py-2 rounded-full ${sortOption === 'highToLow' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}
                        onClick={() => setSortOption('highToLow')}
                    >
                        Price High to Low <IonIcon icon={caretDown} className="flex-inline align-middle"></IonIcon>
                    </button>


                    <select
                        className="block sm:hidden mx-2 px-4 capitalize py-2 rounded-full"
                        value={selectedCategory}
                        onChange={(e) => handleFetch(e.target.value)}
                    >
                        {category.map((item, idx) => (
                            <option key={idx} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    {/* Buttons for Larger Screens */}
                    {category.map((item, idx) => (
                        <button
                            key={idx}
                            className={`hidden sm:inline-block mx-2 px-4 py-2 rounded-3xl capitalize ${selectedCategory === item ? 'bg-teal-900 text-white' : 'bg-gray-200'}`}
                            onClick={() => handleFetch(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Product Listing */}
                <div className={`w-[80%] ml-auto mr-auto`}>


                    <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts?.map((product, idx) => (
                            <div key={idx} className="px-2 pb-4 md:px-5">
                                <section
                                    key={idx}
                                    className="flex flex-col w-full md:w-full lg:w-full"
                                >
                                    <div className="flex flex-col">
                                        <div className="relative flex items-center justify-center">
                                            <img
                                                className="w-48 h-48 object-scale-down"
                                                src={product.images[0]}
                                                alt={product.name}
                                            />
                                            <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">
                                                {/* ... (your existing code for hover effects) ... */}
                                            </div>
                                            <div className="absolute top-0 right-1 mt-3 flex items-center justify-center bg-amber-400">
                                                <p className="px-2 py-2 text-sm">
                                                    {calculateDiscountPercentage(product?.originalPrice, product?.price)}% OFF
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mt-2 text-xl h-[3.6rem] overflow-hidden">{product?.name}</p>
                                            <p className="mt-2">{product?.brand}</p>
                                            <p className="text-lg text-teal-950 font-semibold">
                                                &#8377; {product.price}&nbsp;
                                                <span className="text-sm text-gray-500 font-semibold line-through">&#8377; {product.originalPrice}</span>
                                            </p>
                                            <div className="flex items-center text-xl">
                                                {[...Array(Math.round(parseFloat(product?.rating)))].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="h-4 w-4 text-yellow-400"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                ))}
                                                <p className="text-lg text-gray-400">&nbsp; {product?.rating * 10}</p>
                                            </div>
                                            <div>

                                                <Link href={`product/${product?.productId}`}>

                                                    <button className="rounded-2xl my-5 h-10 w-full bg-teal-600 text-gray-50 hover:bg-teal-800 transition duration-500 ease-in-out">
                                                        View
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

