'use client'

import { IonIcon } from "@ionic/react";


export default function CreateProduct() {

    
    return (

        <div className="flex flex-col w-full h-screen justify-center item-center ">

            <div className="flex flex-col mx-auto items-center border-2 shadow-2xl md:h-[80%] rounded-2xl w-full lg:w-[30%]  my-3">

                <div class="absolute top-0  right-5 text-black">
                    <IonIcon icon={CloseCircleOutline} className="mr-1 mt-1"></IonIcon>
                    <p></p>
                </div>

                    <div className="mt-5 max-w-2xl text-center ">
                        <h2 className="m-2 text- text-5xl font-extrabold  ">
                            Name
                        </h2>
                        
                    </div>
                    <br />
                    <div className="flex flex-col justify-center gap-4">
                        {/* Input fields */}

                        <div>
                            <input
                                type="text"
                                name="Product Name"
                                className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                placeholder="Mobile Number"
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                name="discription "
                                className="ring-1 rounded-2xl w-full h-20  px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
                                placeholder="Address"
                            />
                        </div>

                         <div>
                                <button
                                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-green-500 hover:bg-green-400 text-white"
                                >
                                    Submit
                                </button>
                            </div>

                        </div>
                        
                    
                    </div>
         </div>

    )
}