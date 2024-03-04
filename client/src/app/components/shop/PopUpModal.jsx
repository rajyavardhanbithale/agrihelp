'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';


export default function PopUpModal(props) {
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
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div
                            className="absolute inset-0 bg-black opacity-50"
                            onClick={props?.closeModal}
                        ></div>

                        <div className={`bg-white p-8 rounded-md z-10 transition-transform duration-300 ease-in-out transform scale-100 ${props.isOpen ? 'animate-jump-in' : 'animate-jump-out'}`}>
                            <h2 className="text-2xl font-bold mb-4">
                                Item Added! 🛒</h2>
                            <p className="truncate overflow-ellipsis max-w-[250px] md:max-w-[650px]"></p>   

                            <div className="flex flex-row w-full justify-center gap-5">
                                <button
                                    onClick={props.closeModal}
                                    className="mt-4 bg-teal-700 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>

                                <Link href={'/shop/cart'}>


                                    <button
                                        onClick={props.closeModal}
                                        className="mt-4 bg-teal-700 text-white px-4 py-2 rounded"
                                    >
                                        View Cart
                                    </button>
                                </Link>

                            </div>

                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

