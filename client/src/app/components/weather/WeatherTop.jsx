'use client'
import { IonIcon } from "@ionic/react"
import { searchOutline } from "ionicons/icons"


export default function WeatherTop(props) {
    const data = props?.data



    return (
        <>
            {data?.location?.name ? (
                <div className="w-full ml-3 flex gap-4 justify-between">
                    <div>
                        <h1 className="text-4xl font-semibold">{data?.location?.name}, {data?.location?.country_code}</h1>
                        <div className="text-xl">{data?.current?.last_update_formatted}</div>
                    </div>
       
                </div>
            ) : (<div className="w-1/2 ml-3 space-y-3">
                <h1 className="animate-pulse text-4xl rounded-2xl bg-gray-200 text-transparent font-semibold">1212312313213</h1>
                <div className="animate-pulse w-3/4 rounded-2xl bg-gray-200 text-transparent">123</div>
                                    
                                    
            </div>)}

            


            <div className="ml-auto mr-auto lg:mr-0 flex mt-1 justify-between items-center w-[90%] md:flex md:mt-1 md:w-1/2 lg:w-[30%] ">
                {data?.location?.name ? (
                    <>
                        

                        <div className="flex my-4 text-center md:w-44 sm:w-1/2 px-3">
                            <img src={`https://openweathermap.org/img/wn/${data?.current?.condition?.icon_code}@4x.png`} alt="weather icon " className="lg:h-40 h-32" />
                        </div>
                        <div className="flex-grow text-center sm:w-1/2 sm:text-center px-3">
                            <div className="text-5xl lg:text-7xl font-light relative sm:text-left">
                                {data?.current?.main?.temp}
                                <span className="text-4xl -mt-20 absolute top-[70px] right-8 lg:right-10 lg:left-24 md:right-0 md:left-16 ">&deg;</span>
                            </div>
                            <div className="text-center text-base sm:text-left">{data?.current?.condition?.type1} | {data?.current?.condition?.type2?.main}</div>
                        </div>
                        
                    </>
                ) : (
                    <div className="w-full ml-3">
                        <div className="animate-pulse h-32 w-32 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse text-5xl lg:text-7xl font-light relative sm:text-left h-8 w-32 bg-gray-200 rounded-md mt-2"></div>
                        <div className="animate-pulse text-center text-base sm:text-left h-6 w-40 bg-gray-200 rounded-md mt-2"></div>
                    </div>
                )}
            </div>

            <div className="ml-auto mr-auto lg:ml-5 justify-around p-4 text-lg md:text-2xl md:border-t-0 md:border-l-2 md:border-b-0 border-b-2 border-t-2 flex border-black border-opacity-50 md:w-1/2 w-[90%] sm:border-0 mt-4 md-4 sm:border-t-2 sm:border-b-2">
                {data?.location?.name ? (
                    <>
                        <div className="mx-3">
                            <div className="mt-4">{data?.current?.main?.temp_max}&deg;</div>
                            <div className="text-black opacity-60">High</div>
                            <div className="mt-4">{data?.current?.main?.temp_min}&deg;</div>
                            <div className="text-black opacity-60">Low</div>
                        </div>
                        <div className="mx-3">
                            <div className="mt-4">{Math.round(data?.current?.wind?.mph)} mph</div>
                            <div className="text-black opacity-60">Wind</div>
                            <div className="mt-4">{data?.current?.rain}%</div>
                            <div className="text-black opacity-60">Rain</div>
                        </div>
                        <div className="mx-3">
                            <div className="mt-4">{data?.current?.astro?.sunrise}</div>
                            <div className="text-black opacity-60">Sunrise</div>
                            <div className="mt-4">{data?.current?.astro?.sunset}</div>
                            <div className="text-black opacity-60">Sunset</div>
                        </div>
                    </>
                ) : (
                    <div className="w-full ml-3 space-y-4">
                        <div className="animate-pulse h-8 w-20 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse text-black opacity-60 h-4 w-16 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse h-8 w-20 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse text-black opacity-60 h-4 w-16 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse h-8 w-20 bg-gray-200 rounded-md"></div>
                        <div className="animate-pulse text-black opacity-60 h-4 w-16 bg-gray-200 rounded-md"></div>
                    </div>
                )}
            </div>

        </>
    )



}
