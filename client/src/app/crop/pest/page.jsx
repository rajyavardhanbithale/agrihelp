'use client'


import { IonIcon } from "@ionic/react";
import axios from "axios";
import { imageOutline, reloadOutline } from "ionicons/icons";
import Image from "next/image";
import { useState, useEffect } from "react";



export default function Pest() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
        } else {
            alert("Please select a valid image file.");
        }
    };

    useEffect(() => {
        const uploadAndPostData = async () => {
            if (file) {
                setLoading(true);

                const formData = new FormData();
                formData.append('file1', file);

                try {
                   
                    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/crop/defect`, formData, {
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
    
    console.log(apiData);

    return (
        <>
            <div className="-mt-20">
                <div className="flex  md:h-screen">
                    <img
                        className="hidden lg:block w-1/2"
                        src="/assets/crop/pest.webp"
                        alt=""
                    />
                    <div className="flex  flex-col items-center py-56 w-full lg:w-1/2 mx-5 my-3">
                        <div className="flex flex-col items-center justify-center md:h-screen tracking-wider">
                            <span className="text-5xl text-teal-900 font-bold">Pest Finder</span>
                            <span className="text-3xl text-teal-900 capitalize mt-2 text-center">upload image of infected leaf </span>

                            <div className="flex justify-center flex-col w-full p-6 bg-white mt-10 border border-gray-300 rounded-lg shadow-md">
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
                    </div>

                </div>

                <div className="md:mt-20 md:w-3/4 mx-auto">
                    {apiData ? (
                        <div className="flex justify-center items-center mb-16 ">
                            <span className="w-1/2 bg-teal-950 py-6 px-5 text-white text-center text-3xl rounded-2xl font-bold ">RESULT</span>
                        </div>
                    ) : null}

                    {apiData ? (
                        <div className="w-full md:p-5 p-4 text-2xl text-center md:flex md:justify-between items-end tracking-wide leading-relaxed">
                            <div dangerouslySetInnerHTML={{ __html: apiData }} />
                        </div>
                    ) : null}
                </div>

               <div id="recommendation" className="p-20"></div>



            </div>





        </>
    )
}


