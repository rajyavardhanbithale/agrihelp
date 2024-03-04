'use client'

import { useParams } from "next/navigation"

import axios from "axios"
import CryptoJS from "crypto-js"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import ConfettiExplosion from "react-confetti-explosion"
import { IonIcon } from "@ionic/react"
import { reload, trashBin } from "ionicons/icons"
import FullPageLoader from "@/app/components/Loader/FullPageLoader"
import AuthNotiy from "@/app/components/Sections/AuthNotify"

export default function RoadmapDynamic() {
    const cropParam = useParams()["id"]
    const [showTimeline, setShowTimeline] = useState(false)
    const [showDiv, setShowDiv] = useState(false)
    const [animation, setAnimation] = useState(false)
    const [cropData, setCropData] = useState(null)
    const [progressStage, setProgressStage] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cropName, setCropName] = useState(null)
    const [email, setEmail] = useState(null)

    useEffect(() => {
        const getEncryptedCookie = Cookies.get("user") || null
        if (getEncryptedCookie) {
            const parseEncryptedCookie = CryptoJS.AES.decrypt(getEncryptedCookie, 'rar').toString(CryptoJS.enc.Utf8)
            const jsonDecrypt = JSON.parse(parseEncryptedCookie)
            setEmail(jsonDecrypt?.email)

        } else {
            window.location.href = "/login?callback=/roadmap"
        }

    }, [])

    useEffect(() => {
        console.log(cropParam);
        handleCropButton(cropParam)
        setError(false)
    }, [email])


    const handlefetch = async (param, body) => {
        setLoading(true)
        setError(false)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/roadmap${param}`, body)
            if (response.status === 200) {
                setLoading(false)
                return response.data
            }
        } catch (error) {
            setError(true)
            setLoading(false)
            return null
        }

    }

    const handleCropButton = async (cropName) => {
        setCropName(cropName)
        let body = {
            "email": email,
            "name": cropName,
            "stage": true,
            "stageIndex": 0
        }
        const response = await handlefetch("?method=get", body)
        if (response) {
            setCropData(response?.[cropName])
        }
        body = {
            "email": email,
            "name": cropName,
            "stage": true,
            "stageIndex": 0
        }
        
        const response1 = await handlefetch("?method=update", body)

        if (response1) {
            setProgressStage(response1.detail)
            
        }
    }


    const handleUpdateCrop = async (cropName, index) => {
        let body = {
            "email": email,
            "name": cropName,
            "stage": true,
            "stageIndex": index
        }

        const response = await handlefetch("?method=update", body)
        if (response) {
            setProgressStage(prevProgressStage => {
                const updatedProgressStage = [...prevProgressStage];
                updatedProgressStage[index] = true;
                return updatedProgressStage;
            });
        }
    }

  

    const handleReset = async () => {
        let body = {
            "email": email,
            "name": cropName,
            "stage": true,
            "stageIndex": 0
        }
        const response = await handlefetch("?method=delete", body)
        window.location.href = "/roadmap"
    }


    const handleToggle = (stage) => {
        setShowTimeline(prevState => ({
            ...prevState,
            [stage]: !prevState[stage],
        }));

        setShowDiv(prevState => ({
            ...prevState,
            [stage]: !prevState[stage],
        }));
        setAnimation(!animation)
    }
    return (
        <>
        {email &&
                <AuthNotiy value={""}></AuthNotiy>
            }
        {(cropData && progressStage) ? (
                <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-full">
                    <div className="flex">
                        <span className="mx-auto text-4xl text-center font-semibold capitalize">Roadmap to Cultivate {cropName}</span>
                    </div>
                    <div className="md:p-16 p-7 w-full lg:w-1/2 lg:mx-auto">
                        <ol className="relative border-l-8 border-gray-200 bg-white">
                            {cropData?.map((stage, idx) => (

                                <li key={idx} className="mb-10 ms-6">

                                    <span className={`${progressStage[idx] ? "bg-green-600" : "bg-gray-600"} absolute flex items-center justify-center w-8 h-8 rounded-full -start-5`}></span>
                                    <span className={`${progressStage[idx] ? "bg-green-600" : "bg-gray-600"} text-white px-2 py-1 rounded-2xl`}>
                                        {stage.timeline}
                                    </span>
                                    <div className={`${progressStage[idx] ? "bg-green-600" : "bg-gray-600"}  mt-4 flex flex-col items-center justify-between p-4 border rounded-lg shadow-sm sm:flex `}>
                                        <div onClick={() => handleToggle(stage.title)} className="cursor-pointer md:text-2xl text-xl capitalize w-full text-center font-bold text-white">
                                            {stage.title.replace(/_/g, ' ')}
                                        </div>
                                        <div onClick={() => handleToggle(stage.title)} className={`${progressStage[idx] ? "bg-green-800" : "bg-gray-800"} cursor-pointer text-lg mt-4 capitalize rounded-2xl text-center font-semibold text-white px-4 py-2`}>
                                            {showDiv[stage.title] ? "Close" : "Read"}
                                        </div>

                                        {showDiv[stage.title] && (
                                            <div className={` text-white w-full text-center text-xl md:p-4 p-2 ${animation ? "animate-fade-down ease-out" : ""}`}>
                                                <ul>
                                                    {showTimeline[stage.title] && stage.tasks.map((task, taskIdx) => (
                                                        <div key={idx}>
                                                            <li>
                                                                {task}
                                                            </li>

                                                        </div>
                                                    ))}
                                                    {progressStage[idx] ? (
                                                        <>
                                                            <div className="flex w-full justify-center align-middle items-center">
                                                                <ConfettiExplosion particleSize={5} particleCount={50} force={0.3}  />
                                                              
                                                            </div>

                                                            <button className={`${progressStage[idx] ? "bg-green-950" : "bg-gray-800"}  py-2 px-4 rounded-2xl mx-2 my-4`}>Completed</button>
                                                            
                                                        </>
                                                    ) : (
                                                        <button onClick={() => handleUpdateCrop(cropName, idx)} className={`${progressStage[idx] ? "bg-green-800" : "bg-gray-800"} inline-flex justify-center align-middle items-center  py-2 px-4 rounded-2xl mx-2 my-4`}>Mark As Done {loading && <IonIcon icon={reload} className="ml-2 text-lg animate-spin"></IonIcon>} </button>
                                                    )}

                                                    <button className={`${progressStage[idx] ? "bg-green-800" : "bg-gray-800"} inline-flex justify-center align-middle items-center  py-2 px-4 rounded-2xl mx-2 my-4`}>Shop Product</button>
                                                    {error && <p className="text-red-100 animate-pulse">Complete the Previous Steps First</p>
                                                    }
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <div className="flex justify-center">
                            <button onClick={handleReset} className={`flex justify-center align-middle items-center md:w-1/3 bg-red-500 text-white py-3 text-xl font-semibold px-4 rounded-2xl mx-2 my-4`}>Reset Progress <IonIcon icon={trashBin} className="ml-2 text-lg"></IonIcon></button>
                        </div>
                    </div>
                </div>

            ) : (
               
                   <FullPageLoader/>
            )}
           

        </>
    )
}
