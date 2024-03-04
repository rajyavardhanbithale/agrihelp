'use client'
import { IonIcon } from '@ionic/react';
import { closeCircleOutline } from 'ionicons/icons';
import Link from 'next/link';
import React, { useEffect } from 'react';


export default function RentModal(props) {
    useEffect(() => {
        if (props?.isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [props?.isOpen]);



    return (
        <>

            <div>
                {props?.isOpen && (
                    <div className="absolute inset-0 z-50  items-center  flex flex-col justify-center item-center  ">

                        <div className=" flex flex-col mx-auto items-center border-2 shadow-2xl md:h-[50%] rounded-2xl w-[50%] lg:w-[30%]  my-3 bg-white  ">

                            <div onClick={props.closeModal} class="relative flex w-full flex-row-reverse right-2 top-2  text-black">
                                <IonIcon icon={closeCircleOutline} className="mr-1 mt-1 text-2xl"></IonIcon>
                          
                            </div>

                            <div className="mt-auto mb-auto">

                                <div className="max-w-2xl text-center">
                                    <h2 className="m-2 text- text-5xl font-extrabold  ">
                                        Fill Details
                                    </h2>

                                </div>
                                <br />
                                <div className="flex flex-col justify-center gap-4">
                                    {/* Input fields */}

                                    <div>
                                        <input
                                            type="text"
                                            name="Product Name"
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-101 duration-300"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name=""
                                            placeholder="Contact Number"
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-101 duration-300"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="text"
                                            name="discription "
                                            className="ring-1 rounded-2xl w-full h-20  px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-101 duration-300"
                                            placeholder="Address"
                                        />
                                    </div>

                                    <div>
                                        <button onClick={props.closeModal}
                                            className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-green-500 hover:bg-green-400 text-white"
                                        >
                                            Submit
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

