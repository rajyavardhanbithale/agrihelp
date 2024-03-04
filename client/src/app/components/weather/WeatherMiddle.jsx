'use client'

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'

export default function WeatherMiddle(props) {
    const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);
    const [lastVisibleIndex, setLastVisibleIndex] = useState(5);
    const [screenWidth, setScreenWidth] = useState(0);

    const [element, setElement] = useState(3);

    const updateScreenWidth = () => {
        setScreenWidth(window.innerWidth);
    };

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        window.addEventListener('resize', updateScreenWidth);
        return () => {
            window.removeEventListener('resize', updateScreenWidth);
        };
    }, []);

    useEffect(() => {
        if (screenWidth <= 500) {
            setElement(3)
            setLastVisibleIndex(3)
        } else if (screenWidth <= 1280) {
            setElement(5)
            setLastVisibleIndex(5)
        }
        else {
            setElement(7)
            setLastVisibleIndex(7)
        }
    }, [screenWidth])

    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],


        easing: 'ease',
        swipeToSlide: true,
        draggable: true,
        afterChange: (currentSlide) => {
            setFirstVisibleIndex(currentSlide);
            setLastVisibleIndex(currentSlide + element);
        },

    };
    const data = props?.data
    return (
        <>
            <div className="mt-10 w-full justify-between sm:max-w-[748px] lg:max-w-[70%] ">
                <h2 className="heading text-black font-bold text-xl md:text-2xl md:mb-5 text-center ">Today&apos;s weather</h2>

                {data ? (
                    <div className="w-[100%] ml-auto mr-auto">
                        <Slider
                            {...settings}
                        >
                            {data?.map((item, idx) => (
                                <div key={idx} className="px-2 pb-4 md:px-5">
                                    <div className="flex-shrink-0 px-3  bg-white border-black text-base text-center h-[200px] w-[120px] mx-auto flex flex-col justify-center items-center">
                                        <div className="mb-2">{item?.info?.time_formatted}</div>
                                        <img src={item?.info?.condition?.icon} alt="Mostly sunny" className="w-16 h-16 object-cover my-2 " />
                                        <div>{item?.info?.temp.toFixed(0)}&deg;</div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                ) : (
                    <div className="w-[100%] ml-auto mr-auto">
                        <div className="animate-pulse flex flex-row ">

                            {[...Array(element)].map((placeholder, idx) => (
                                <div key={idx} className="px-2 pb-4 md:px-5">
                                    <div className="flex-shrink-0 px-3 rounded-xl bg-gray-200 text-base text-center md:h-[200px] mt-5 h-[150px] md:w-[120px] w-[100px] lg:md:w-[150px] mx-auto flex flex-col justify-center items-center">
                                        <div className="mb-2">Loading...</div>
                                        <div className="w-8 h-16 bg-gray-300 my-2"></div>
                                        <div className="h-6 w-16 bg-gray-300 my-2"></div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    </div>
                )}

                {data && <WeatherDataChart weatherData={data} current={firstVisibleIndex} next={lastVisibleIndex} />}


            </div>
        </>
    )
}



const WeatherDataChart = (props) => {
    const weatherData = props?.weatherData
    const current = props?.current;
    const next = props?.next;
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (weatherData) {

            const data = weatherData.slice(current, next).map((item) => ({
                time: item?.info?.time_formatted,
                temperature: item?.info?.temp,
            }));
            setChartData(data);
        }
    }, [current, next]);

    return (
        <>
            <div className="-mt-10  lg:max-w-[100%] w-[90%] ml-5 md:ml-0 md:w-full justify-between sm:max-w-[708px] ">
                <div className="flex flex-row gap-5 my-5 md:flex md:gap-10 overflow-x-auto max-h-screen">
                    <div className="chart-container" style={{ width: '100%' }}>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={chartData}>
                                <Tooltip />
                                <XAxis dataKey="time" interval={0} width="80%" height={140} />
                                <Line type="monotone" animationDuration={300} dataKey="temperature" stroke="#042F2E" activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
};
