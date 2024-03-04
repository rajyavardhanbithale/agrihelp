import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import axios from 'axios';

export default function UpdateMenu(props) {
    console.log(props && props?.data);
    const id = props && props?.data
    const [formData, setFormData] = useState({
        method: 'update',
        productID : 'id',
        productName: '',
        originalPrice: '',
        remainingQuantity: '',
        inStocks: '',
        weight: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        formData.productID = id
        console.log(formData);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-admin`, formData);
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        if (props?.isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [props?.isOpen]);

    return (
        <>
            <div className='p-10'>
                {props?.isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div>
                            <div className="bg-white p-5  flex flex-col mx-auto items-center border-2 shadow-2xl md:h-[80%] rounded-2xl w-full lg:w-[80%]  my-3">
                                <div className="mt-5  text-center">
                                    <h2 className="m-2 text- text-5xl font-extrabold">
                                        Update Product
                                    </h2>
                                </div>
                                <div onClick={props.closeModal} className="relative flex w-full flex-row-reverse right-2 top-2  text-black">
                                    <IonIcon icon={closeCircleOutline} className="mr-1 mt-1 text-2xl"></IonIcon>
                                </div>
                                <br />
                                <div className="flex flex-col justify-center gap-4">
                                    <div className='flex justify-center w-full gap-4'>
                                        <input
                                            type="text"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleChange}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="Product name"
                                        />
                                        <input
                                            type="text"
                                            name="originalPrice"
                                            value={formData.originalPrice}
                                            onChange={handleChange}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="Original Price"
                                        />
                                    </div>
                                    <div className='flex justify-center w-full gap-4'>
                                        <input
                                            type="number"
                                            name="remainingQuantity"
                                            value={formData.remainingQuantity}
                                            onChange={handleChange}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="Remaining Quantity"
                                        />
                                        <input
                                            type="number"
                                            name="inStocks"
                                            value={formData.inStocks}
                                            onChange={handleChange}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="In Stocks"
                                        />
                                    </div>
                                    <div className='flex justify-center w-full gap-4'>
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="Weight"
                                        />
                                    </div>
                                    <div>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="ring-1 rounded-2xl w-full h-20 px-4 py-3 ring-gray-900/10 text-black"
                                            placeholder="Description"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleSubmit}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-green-500 hover:bg-green-400 text-white"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
