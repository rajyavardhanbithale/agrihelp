'use client'
import { IonIcon } from "@ionic/react"


export default function Progress() {
    const availableCrop = ['rice', 'maize', 'chickpea', 'kidneybeans', 'pigeonpeas', 'mothbeans',
        'mungbean', 'blackgram', 'lentil', 'pomegranate', 'banana', 'mango', 'grapes',
        'watermelon', 'muskmelon', 'apple', 'orange', 'papaya', 'coconut', 'cotton',
        'jute', 'coffee']

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        window.location.href = `/roadmap/${selectedValue}`;
    };

    return (
        <>
            <div className="md:-mt-20 -mt-4 flex mix-h-screen md:h-screen overflow-hidden">
                <img className="hidden lg:block w-1/2 object-contain rounded-xl bg-[#ECFCFB]" src="/assets/roadmap/roadmap.png" alt="" />
                <div className="flex flex-col w-full leading-10 tracking-wider justify-center align-middle">
                    <span className="text-5xl text-center font-semibold">Crop Cultivation Guide</span>
                    <span className="text-lg text-center font-light mt-4 p-2">Navigate the Path to Abundant Harvests with Expert Tips and Proven Techniques</span>
                    <span className="text-2xl text-center  mt-8 p-2 font-semibold">Select Crop</span>

                    <div className=" flex flex-col w-full justify-center gap-8 items-center em text-center p-8 ">
                        <div className="relative inline-block text-left">
                            <select
                                onChange={handleSelectChange}
                                className="block capitalize appearance-none w-full text-2xl bg-white border border-gray-300 hover:border-gray-500 px-6 py-3 pr-8 rounded-xl shadow-xl leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="" disabled>Select a crop</option>
                                {availableCrop.map((crop) => (
                                    <option key={crop} value={crop} className="capitalize">
                                        {crop}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M15 0C6.716 0 0 6.716 0 15s6.716 15 15 15 15-6.716 15-15S23.284 0 15 0zm0 28C7.268 28 2 22.732 2 15S7.268 2 15 2s13 5.268 13 13-5.268 13-13 13zm0-24a2 2 0 100-4 2 2 0 000 4z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>







        </>
    )
}
