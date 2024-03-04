'use client'
import { IonIcon } from '@ionic/react';
import { refreshOutline, reloadCircle, reloadOutline } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';

export default function Main() {
    const [seconds, setSeconds] = useState(process.env.NEXT_PUBLIC_API_TIMEOUT);
    const [isServerResponsive, setIsServerResponsive] = useState(false);
    const [serverMessages, setServerMessages] = useState([
        "Initializing server.. ",
        "Loading configurations.. ",
        "Starting services.. ",
        "Server is turning on. Please wait.. ",
        "Server is now online! 🚀",
    ]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [timerSpeed, setTimerSpeed] = useState(1000);
    const [error, setError] = useState(null);

    let maxAttempts = 20;

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else {
                setSeconds("SERVER ERROR")
                setError("Contact Site Admin")
                clearInterval(countdownInterval);
            }
        }, timerSpeed);

        return () => clearInterval(countdownInterval);
    }, [seconds]);


    useEffect(() => {
        const messagesInterval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => {
                if (prevIndex < serverMessages.length - 1) {
                    return prevIndex + 1;
                } else {
                    return 0;
                }
            });
        }, 10000);

        return () => clearInterval(messagesInterval);
    }, []);


    const checkEndpointStatus = async () => {
        const timeout = 1000;

        let attempts = 0;

        while (attempts < maxAttempts) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ping`);
                const data = await response.json();

                if (response.status === 200) {
                    maxAttempts = 0;
                    setSeconds(10)
                    setTimerSpeed(200)
                    setIsServerResponsive(true);
                    setCurrentMessageIndex(4)
                    sleep = setInterval(() => {
                        window.location.href = '/'
                    }, 1300)

                    return;
                }
            } catch (error) {

            }

            attempts++;
            await new Promise(resolve => setTimeout(resolve, timeout));
        }

        setIsServerResponsive(false);
    };

    useEffect(() => {
        checkEndpointStatus();
        if (!isServerResponsive) {
            const intervalId = setInterval(() => {
                checkEndpointStatus();
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, []);


    return (
        <>
            <div className="w-full -mt-10 md:-mt-10 lg:-mt-16 h-screen flex flex-col lg:flex-row items-center justify-center md:space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-6 flex gap-3 items-center">Please Wait</p>
                    <div className=" tracking-wider text-gray-300">
                        <span className="text-7xl md:text-8xl lg:text-9xl font-bold">
                            {seconds}

                        </span>
                        {seconds !== "SERVER ERROR" &&
                            <span className="text-3xl md:text-4xl lg:text-5xl font-semibold">s</span>
                        }
                    </div>

                    <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">Server Wake-Up</p>
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-6 flex gap-3 items-center">
                        {error ? (error) : (serverMessages[currentMessageIndex])} {!error ? (<IonIcon className="animate-spin animate-infinite animate-duration-[400ms] text-gray-800 text-xl" icon={reloadOutline}></IonIcon>
                        ) : (
                            <>
                                <a href="mailto:bithale02@gmail.com">- bithale02@gmail.com</a>
                                <a href="mailto:rajyavardhan@aol.com">- rajyavardhan@aol.com</a>

                            </>

                        )}
                    </p>



                </div>
                <div className="md:w-1/2 w-10/12 -mt-10 md:-mt-10 flex lg:items-end justify-center md:p-4">
                    <img src="/assets/wakeup-call/server.gif" className="-ml-12 md:-ml-0" alt="Server GIF"></img>
                </div>
            </div>
        </>
    );
}
