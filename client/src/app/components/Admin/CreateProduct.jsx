'use client'

import React, { useEffect, useState } from 'react';
import { IonIcon } from "@ionic/react";
import axios from "axios";
import { imageOutline, reloadOutline, time } from "ionicons/icons";

export default function CreateProduct() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        time: Date.now(),
        method: "create",
        productName: '',
        type: '',
        brand: '',
        category: '',
        discountedPrice: '',
        originalPrice: '',
        images:[],
        remainingQuantity: '',
        weight: '',
        description: ''
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
        } else {
            alert("Please select a valid image file.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async () => {
        // phase 1
        console.log(formData);
        try {
            setLoading(true);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-admin`, formData);
            console.log(response.data); // Handle response as needed
        } catch (error) {
            console.error('Error submitting form:', error);
        }

       

    }
    useEffect(() => {
        const uploadAndPostData = async () => {
            
            if (file) {
             
                setLoading(true);

                const formData = new FormData();
                formData.append('file1', file);
                formData?.images?.push(file.name)
                try {
                   
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/shop-create-image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    console.log('Image successfully uploaded:');
                    if (response.status === 200) {
                        setLoading(false)
                        setApiData(response.data)
                        document.getElementById("recommendation")?.scrollIntoView();
                    }

                    setLoading(false);
                } catch (error) {
                    setError('Error in Uploading Image to Server ');
                    setLoading(false);
                }
            }
        };
        
        uploadAndPostData();
    }, [file]);

    return (
        <div className="flex flex-col w-full h-screen justify-center">
            <div className="flex flex-col mx-auto items-center border-2 shadow-2xl md:h-[80%] rounded-2xl w-full lg:w-[40%]  my-3">
                <div className="mt-5 max-w-2xl text-center">
                    <h2 className="m-2 text- text-5xl font-extrabold">Create Product</h2>
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
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                            placeholder="Type"
                        />
                    </div>
                    <div className='flex justify-center w-full gap-4'>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                            placeholder="Brand"
                        />
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                            placeholder="Category"
                        />
                    </div>
                    <div className='flex justify-center w-full gap-4'>
                        <input
                            type="text"
                            name="discountedPrice"
                            value={formData.discountedPrice}
                            onChange={handleChange}
                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black"
                            placeholder="Discounted Price"
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
                    <div className='flex justify-center w-full gap-0'>
                        <div className="flex justify-center flex-col  px-6 w-1/2 bg-white mt-10 border border-gray-300 rounded-lg shadow-md">
                            <label
                                htmlFor="fileInput"
                                className="block mt-3 mb-5 text-gray-600 font-medium text-center text-lg"
                            >
                                {file ? (
                                    file.name
                                ) : (
                                    <span className="flex flex-col justify-center items-center">
                                        <IonIcon icon={imageOutline} className="text-7xl mb-2"></IonIcon>
                                        <span>

                                            Choose a Image File
                                        </span>
                                    </span>
                                )}

                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="fileInput"
                                className="cursor-pointer bg-teal-700 text-white py-2 px-4 text-center rounded-lg transition-all hover:bg-teal-600"
                            >
                                {(file && loading) ? (
                                    <span>
                                        <IonIcon icon={reloadOutline} className="animate-spin text-lg"></IonIcon>
                                    </span>
                                ) : (
                                    "Select File"
                                )}
                            </label>
                            {file && (
                                <div className="mt-4 flex flex-col w-full gap-3 justify-center text-center">
                                    {!error &&
                                        <div>

                                            <h4 className="text-lg font-semibold">{loading ? "Uploading Image" : "Image Uploaded"}</h4>
                                            <p className="text-gray-700">{(loading) ? "Fetching Result .. " : "Found Result"}</p>
                                        </div>
                                    }
                                    <p className="text-red-600 text-xl">{error}</p>
                                </div>
                            )}

                        </div>

                    </div>
                    <div>
                        <button onClick={handleSubmit}

                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-green-500 hover:bg-green-400 text-white"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}