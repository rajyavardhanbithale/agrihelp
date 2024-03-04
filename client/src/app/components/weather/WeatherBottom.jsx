



export default function WeatherBottom(props) {
    const data = props?.data
    return (
        <>
            <div className={`w-[90%] lg:w-[80%]  ${data ? "-mt-24" : "mt-0"}`}>
                <h2 className="text-black font-bold md:text-2xl text-xl text-center py-5">
                    {data ? 'Next 5 days' : 'Loading...'}
                </h2>

                <div className="lg:grid lg:grid-cols-2 lg:gap-10">
                    {data ? (
                        <div className="flex-row ">
                            {data?.map((item, idx) => (
                                <div className="flex justify-around items-center my-5 md:py-2 rounded-lg border-2 border-gray-800 shadow-lg md:text-xl text-xs text-center" key={idx}>

                                    <div className="w-1/6 mb-0 md:mb-0">
                                        {item?.info?.time_part?.day?.slice(0, 3)}
                                        <div className="text-black opacity-60 text-xs"> {item?.info?.time_part?.date} {item?.info?.time_part?.month?.slice(0, 3)}</div>
                                    </div>

                                    <div className="md:ml-12 md:mr-12 -ml-3">
                                        <img className='lg:h-16 h-12 shadow-xl rounded-full' src={`https://openweathermap.org/img/wn/${item?.info?.condition?.icon}@4x.png`} alt={item?.condition?.type} />
                                    </div>

                                    <div className="w-1/12 ">
                                        {item?.info?.main?.temp_min}&deg;
                                        <div className="text-black opacity-60 text-xs">Low</div>
                                    </div>

                                    <div className="w-1/12">
                                        {item?.info?.main?.temp_max}&deg;
                                        <div className="text-black opacity-60 text-xs">High</div>
                                    </div>

                                    <div className="w-1/12">
                                        {item?.info?.rain?.toFixed(0)}%
                                        <div className="text-black opacity-60 text-xs">Rain</div>
                                    </div>

                                    <div className="w-1/6">
                                        {item?.info?.wind?.mph?.toFixed(1)} mph
                                        <div className="text-black opacity-60 text-xs">Wind</div>
                                    </div>

                                </div>
                            ))}

                        </div>



                    ) : (
                        <div className="flex-col">
                            {[...Array(5)].map((_, idx) => (
                                <div className={`flex justify-around items-center my-5 md:py-2 rounded-lg border-2 border-gray-800 shadow-lg md:text-xl text-xs text-center ${data ? "" : "bg-gray-200 animate-pulse"}`} key={idx}>

                                    <div className="w-1/6 mb-0 md:mb-0">
                                        <div className="animate-pulse h-6 w-12 bg-gray-300 rounded-md"></div>
                                        <div className="animate-pulse h-4 w-16 bg-gray-300 rounded-md mt-1"></div>
                                    </div>

                                    <div className="md:ml-12 md:mr-12 -ml-3">
                                        <div className="animate-pulse h-12 w-12 bg-gray-300 rounded-full"></div>
                                    </div>

                                    <div className="w-1/12 ">
                                        <div className="animate-pulse h-8 w-12 bg-gray-300 rounded-md"></div>
                                        <div className="animate-pulse h-4 w-16 bg-gray-300 rounded-md mt-1"></div>
                                    </div>

                                    <div className="w-1/12">
                                        <div className="animate-pulse h-8 w-12 bg-gray-300 rounded-md"></div>
                                        <div className="animate-pulse h-4 w-16 bg-gray-300 rounded-md mt-1"></div>
                                    </div>

                                    <div className="w-1/12">
                                        <div className="animate-pulse h-8 w-12 bg-gray-300 rounded-md"></div>
                                        <div className="animate-pulse h-4 w-16 bg-gray-300 rounded-md mt-1"></div>
                                    </div>

                                    <div className="w-1/6">
                                        <div className="animate-pulse h-8 w-12 bg-gray-300 rounded-md"></div>
                                        <div className="animate-pulse h-4 w-16 bg-gray-300 rounded-md mt-1"></div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 lg:hidden">
                        <h2 className="text-black font-bold md:text-2xl text-xl text-center py-5">
                            {data ? 'Satellite' : 'Loading...'}
                        </h2>
                    </div>

                    <div className="lg:mt-0 mt-5">
                        <img src="https://mausam.imd.gov.in/Satellite/3Dasiasec_ir1.jpg" className="mx-auto w-[70%]" alt="" />
                    </div>
                </div>
            </div>

        </>
    )

}
