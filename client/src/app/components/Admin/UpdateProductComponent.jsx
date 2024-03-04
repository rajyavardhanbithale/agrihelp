'use client'
import { IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import UpdateMenu from './UpdateMenu';
import { create, createOutline, trash, trashBinOutline } from 'ionicons/icons';



export default function UpdateProductComponent() {
    const [selectedCategory, setSelectedCategory] = useState("seed")
    const [item, setItem] = useState("");
    const [data, setData] = useState(null)
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    const handleBook = (prod) => {
        setData(prod)
        // console.log(data);
        openModal()
    }

    useEffect(() => {
        handleFetch("seeds");
    }, []);

    const category = ["seeds", "fertilizer", "equipment", "pump", "organic", "Pesticide"]

    // console.log(item);
    const handleFetch = async (category) => {
        setSelectedCategory(category);
        console.log(category);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-item?item=95&category=${category}`);
            if (response.status === 200) {
                setItem(response.data);
                console.log(item);

            }
        } catch (error) {
            console.error(error);
        }


    }

    const handleDelete = async (prod) => {
        const body = {
            "productID" : prod,
            "method" : "delete"
        }
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-admin`, body);
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return (
        <>
            <section className='md:flex mt-10'>
                <section className=" w-full md:h-[600px] md:w-full   gap-3 px-5 pb-10 md:grid">
                    <div className='flex w-full justify-center h-16'>

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

                    <UpdateMenu isOpen={isModalOpen} closeModal={closeModal} data={data} />

                    <div className="w-full grid grid-cols-2 justify-evenly gap-10">
                        {item && item?.map((prod, idx) => (
                            <div key={idx} className=" ">
                                <div className='flex w-full align-middle items-center  border border-gray-400 rounded-xl p-5 justify-between'>

                                    <img src={prod["images"][0]} className='w-[70px] h-[60px]' />

                                    <div className='flex flex-col'>
                                        <span className='text-2xl text-black mx-5 font-semibold'>{prod["name"]}</span>
                                        <div className="">
                                            <span className='text-2xl text-black mx-5 font-semibold'>&#8377; {prod["price"]}</span>
                                            <span className='text-lg line-through text-black '>&#8377; {prod["price"]}</span>
                                        </div>


                                    </div>


                                    <div className='flex gap-8'>
                                        <IonIcon icon={create} onClick={() => handleBook(prod["productId"])} className='text-2xl text-green-800'></IonIcon>
                                        <IonIcon icon={trash} onClick={() => handleDelete(prod["productId"])} className='text-2xl text-red-400'></IonIcon>
                                    </div>
                                </div>


                            </div>

                        ))}
                    </div>





                </section>
            </section>
        </>
    );
}