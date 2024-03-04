'use client'
import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { caretDown, caretUp, search } from 'ionicons/icons';
import PopUpModalScheme from './PopUpModalScheme';
import EndpointError from '../components/EndpointError';



export default function GovScheme() {
    const [data, setData] = useState({})
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("private");
    const [item, setItem] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(null)


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const filteredProducts = item
        .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const handleFetch = async (category) => {
        setSelectedCategory(category);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/financial-aid?category=${category}`);
            if (response.status === 200) {
                setItem(response.data);
                setLoading(1)
            }
        } catch (error) {
            setError("Error in Fetching Data")
            setLoading(1)
        }

    }

    useEffect(() => {
        handleFetch(selectedCategory)
        setSelectedCategory("private");
    }, [])

    const showDetail = () => {
        openModal();
    }

    function handleButtonClick(product) {
        setData(product);
        openModal();
    }

    const category = ["private"] //"government", 

    return (
        <>
            <div className="mx-auto flex justify-center  items-start px-5 mb-5">
                <section className="rounded-2xl mt-5 flex justify-between bg-emerald-900 px-5">
                    <div className="py-5 px-2 lg:px-16">
                        <p className="text-white font-bold">AGRIHELP </p>
                        <p className="text-white font-semibold">Financial Aid</p>

                        <p className="pt-4 text-white text-2xl">
                            Browse Aid
                        </p>

                    </div>
                    <img
                        className="ml-20 -mr-5 hidden w-[300px] h-[200px]  object-cover md:block rounded-2xl bg-blend-darken"
                        src="https://st3.depositphotos.com/22740078/36504/i/450/depositphotos_365049550-stock-photo-coins-stacked-each-other-close.jpg"
                        alt="aid"
                    />

                </section>
            </div>
            <div className="bg-white">

                <div className="flex justify-center pt-8">
                    <div className="md:w-3/6 lg:w-3/12 w-3/4">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full border-gray-600 border-2 h-10 pl-4 pr-10 text-sm rounded-full focus:outline-none focus:shadow-outline"
                                placeholder="Search Financial Aid..."
                                value={null}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute top-0 right-0 mt-3 mr-4">
                                <IonIcon icon={search}></IonIcon>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center mt-8 gap-y-4">


                    {/* Buttons for Larger Screens */}
                    {category.map((item, idx) => (
                        <button
                            key={idx}
                            className={` mx-2 px-4 py-2 rounded-3xl capitalize ${selectedCategory === item ? 'bg-teal-900 text-white' : 'bg-gray-200'}`}
                            onClick={() => handleFetch(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {error ? (
                    <EndpointError />
                ) : (null)}

                <div className={`w-[80%] ml-auto mr-auto`}>

                    {(loading) ? (
                        <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts?.map((product, idx) => (
                                <div key={idx} className="px-2 pb-4 md:px-5">
                                    <section
                                        key={idx}
                                        className="flex flex-col border-gray-600 rounded-xl border-[2px] px-8 w-full md:w-full lg:w-full"
                                    >
                                        <div className="flex flex-col">
                                            <div className="relative flex items-center justify-center">
                                                <img
                                                    className="w-48 h-48 object-scale-down mt-5"
                                                    src={product.image}
                                                    alt={product.name}
                                                />
                                                <div className="absolute flex h-full w-full items-center justify-center gap-3 opacity-0 duration-150 hover:opacity-100">

                                                </div>

                                            </div>
                                            <div>
                                                <p className="mt-2 text-xl h-[3.6rem] overflow-hidden">{product?.name}</p>
                                                <p className="mt-2">{product?.brand}</p>
                                                <p className="text-lg text-teal-950 font-semibold">
                                                    From  : {product?.openDate} -
                                                    <br></br>
                                                    <span className="text-lg text-gray-500 font-semibold"> {product?.closeDate}</span>
                                                </p>

                                                <div  >

                                                    <button onClick={() => handleButtonClick(product)}
                                                        className={`rounded-2xl my-5 h-10 w-full ${product?.isOpen ? "bg-teal-600" : "bg-teal-950"} text-gray-50 hover:bg-teal-800 transition duration-500 ease-in-out`}>
                                                        {product?.isOpen ? (
                                                            <span>View</span>
                                                        ) : (
                                                            <span className="line-through">Registration Closed</span>
                                                        )}
                                                    </button>

                                                </div>

                                            </div>
                                        </div>
                                    </section>
                                </div>
                            ))}
                            {isModalOpen && (
                                <PopUpModalScheme data={data} isOpen={isModalOpen} closeModal={closeModal} />
                            )}
                        </div>
                    ) : (
                        error ? (null) : (
                            <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                                {[...Array(4)]?.map((product, idx) => (
                                    <div key={idx} className="px-2 pb-4 md:px-5">

                                        <section
                                            key={idx}
                                            className="flex flex-col border-gray-600 rounded-xl border-[2px] px-8 w-full md:w-full lg:w-full animate__animated animate__fadeIn"
                                        >
                                            <div className="flex flex-col">
                                                <div className="relative flex items-center justify-center">
                                                    <div className="w-44 h-44 mt-3 bg-gray-300 animate-pulse rounded-lg"></div>
                                                </div>
                                                <div>
                                                    <p className="mt-2 text-xl overflow-hidden rounded-xl h-5 bg-gray-300 animate-pulse"> </p>
                                                    <p className="mt-2 rounded-xl h-5 bg-gray-300 animate-pulse"></p>
                                                    <p className="mt-2 mb-4 rounded-xl h-5 bg-gray-300 animate-pulse"></p>
                                                </div>
                                            </div>
                                        </section>
                                    </div>

                                ))}

                            </div>
                        )
                    )}
                </div>

            </div>
        </>
    );
};

