'use client'

import { useEffect, useState } from "react";

export default function Offline() {
    const AgricultureEmojis = ['🚜', '🌾', '🌱', '🌻', '🌽', '🍎', '🍇', '🍓', '🌿', '🍅'];
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % AgricultureEmojis.length);
        }, 1050);

        return () => clearInterval(intervalId);
    }, []); 


    return (
        <>
            <div className="-mt-20 flex flex-col items-center justify-center h-screen bg-gradient-to-r text-gray-600">
                <div className="text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Uh-oh, you&apos;re offline!</h1>
                    <p className="text-lg mb-10">It&apos;s like a field without rain.</p>
                    <div className="animate-bounce animate-duration-[1000ms] animate-ease-linear">
                        <span className="text-5xl"> {AgricultureEmojis[currentIndex]}</span>
                    </div>
                    <p className="text-sm mt-6">Attempting to reconnect...</p>
                </div>
            </div>
        </>
    )
}
