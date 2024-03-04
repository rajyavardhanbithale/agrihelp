'use client'
import React, { useEffect } from 'react';

import { useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { IonIcon } from '@ionic/react';
import { arrowForward, bug, caretDownOutline, cartOutline, cashOutline, chatbubble, closeCircle, cloudy, compassOutline, flask, homeOutline, leaf, mailOpenOutline, map, peopleCircleOutline, reader, wallet } from 'ionicons/icons';
import { signOut } from 'next-auth/react';

export default function Navbar() {
    const [user, setUser] = useState()
    const [open, setOpen] = useState(false);
    const [fopen, setfOpen] = useState(false);

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(!open);
    };
    const handleToClosef = () => {
        setfOpen(false);
    };

    useEffect(() => {
        const checkUser = () => {
            const key = 'rar'
            const getEncryptedCookie = Cookies.get("user")

            if (getEncryptedCookie === null || getEncryptedCookie == undefined) {
                setUser(false)
                return
            }
            const parseEncryptedCookie = CryptoJS.AES.decrypt(getEncryptedCookie, key).toString(CryptoJS.enc.Utf8)
            const jsonDecrypt = JSON.parse(parseEncryptedCookie)

            if (jsonDecrypt.validationKey === "token") {
                setUser(true)
            }

        }

        checkUser()

    }, [])
    const handleLogout = () => {
        Cookies.remove("user")
        Cookies.remove("next-auth.session-token")
        Cookies.remove("next-auth.csrf-token")
        Cookies.remove("next-auth.callback-url")
        signOut()
    }



    return (
        <section>
            <header className="bg-green-700 w-full h-16 absolute inset-x-0 top-0 z-50 flex justify-center items-center">

                <nav className="w-full flex items-center justify-between p-6 lg:px-8" aria-label="Global drop-shadow-2xl">
                    <div className="md:w-[10%] flex lg:flex-1">
                        <span className="sr-only">RAGE</span>
                        <Link href={"/"}>

                            <img className="h-16 w-full p-3" src="/assets/nav_white.png" alt="" />
                        </Link>
                    </div>

                    <div className="w-[70%] hidden lg:flex lg:justify-center lg:gap-x-6 text-white">
                        <ul className="hidden lg:flex lg:gap-x-6 text-white">
                            <Link href={"/"}>

                                <li
                                    className="flex text-xl font-semibold hover:text-green-100 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100">
                                    <IonIcon icon={homeOutline} className="mr-1 mt-1"></IonIcon> Home
                                </li>
                            </Link>

                            <li onMouseEnter={() => { setfOpen(true) }} onClick={() => { setfOpen(true) }}
                                className="flex justify-center items-center text-xl font-semibold hover:text-green-100 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                <IonIcon icon={compassOutline} className="mr-1 mt-0.5"></IonIcon> Explore
                                <IonIcon icon={caretDownOutline} className="ml-1 mt-1 text-base"></IonIcon>
                            </li>
                            <Link href={"/shop"}>

                                <li
                                    className="flex text-xl font-semibold hover:text-green-100 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100">
                                    <IonIcon icon={cartOutline} className="mr-1 mt-1"></IonIcon> AgriShop
                                </li>
                            </Link>
                           
                            <Link href={"/about"}>

                                <li
                                    className="flex text-xl font-semibold hover:text-green-100 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100">
                                    <IonIcon icon={peopleCircleOutline} className="mr-1 mt-1"></IonIcon> About Us
                                </li>
                            </Link>
                        </ul>

                    </div>
                    <div className="w-[15%] flex items-center lg:justify-around">
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            {user ? (

                                <div className="text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100">
                                    <span onClick={handleLogout}>

                                        Log Out
                                    </span>
                                </div>

                            ) : (
                                <Link href="/login"
                                    className="flex justify-center align-middle items-center text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100">
                                    Login <IonIcon icon={arrowForward} className="ml-1"></IonIcon>
                                </Link>
                            )}
                        </div>
                        <div className="flex fixed right-6 lg:hidden">
                            <button type="button" onClick={handleClickToOpen}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white">
                                <span className="sr-only">Open main menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </nav>


                <dialog open={open} onClose={handleToClose}>
                    <div className="" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 z-50"></div>
                        <div
                            onClick={handleToClose} className={`${open && "animate-fade-left animate-duration-100 animate-ease-out"} fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-green-700 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}>
                            <div className="flex items-center justify-between">

                                <Link href={"/"}>
                                    <img className="h-8 w-full" src="/assets/nav_white.png" alt="" />
                                </Link>

                                <button onClick={handleToClose} type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                            </div>

                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">

                                    <div className="space-y-2 py-6">
                                        <Link href="/weather"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Weather</Link>
                                        <Link href="/crop"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Crop Recommendation</Link>
                                        <Link href="/crop/pest"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Pest Information</Link>
                                        <Link href="/crop/fertilizer"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Fertilizer Recommendation</Link>
                                        <Link href="/shop"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Shop</Link>
                                        <Link href="/rental-service"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Rent</Link>
                                        <Link href="/roadmap"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Roadmap</Link>
                                        <Link href="https://agrotech-278f8.firebaseapp.com/"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Chat</Link>
                                        <Link href="/scheme"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Scheme</Link>
                                        <Link href="/financial-aid"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Finance</Link>
                                        <Link href="#"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            Feedback</Link>
                                        <Link href="/about"
                                            className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                            About</Link>

                                    </div>
                                    <div className="py-6">
                                        {user ? (

                                            <div className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                                <span onClick={handleLogout}>

                                                    Log Out
                                                </span>
                                            </div>

                                        ) : (
                                            <Link href="/login"
                                                className="block h-14 text-center rounded-lg px-3 pt-4  text-xl font-semibold text-white  hover:text-green-800 transition ease-in-out  hover:-translate-y-0 hover:scale-[1.0] duration-100 ">
                                                Login</Link>
                                        )}


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </dialog>
                {/* features box */}
                <dialog open={fopen} onClose={() => setfOpen(false)} >
                    <div onClick={() => setfOpen(false)} className={`animate-fade-down animate-duration-200 hidden lg:block w-48 fixed top-16  lg:left-[40%] mt-1  text-xm font-semibold text-white bg-green-700 border-2 border-green-800 shadow-2xl  rounded-lg `}>
                        <Link href="/weather">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={cloudy} className="mr-1 mt-1"></IonIcon> Weather
                            </button>
                        </Link>
                        <Link href="/crop">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={leaf} className="mr-1 mt-1"></IonIcon>  Crop Suggestion
                            </button>
                        </Link>
                        <Link href="/crop/pest">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={bug} className="mr-1 mt-1"></IonIcon> Pest Information
                            </button>
                        </Link>
                        <Link href="/crop/fertilizer">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={flask} className="mr-1 mt-1"></IonIcon>Fertilizer Advice
                            </button>
                        </Link>
                        <Link href="/roadmap">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={map} className="mr-1 mt-1"></IonIcon> Roadmap
                            </button>
                        </Link>
                        <Link href="/rental-service">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={cashOutline} className="mr-1 mt-1"></IonIcon> Rent
                            </button>
                        </Link>
                        <Link href="https://agrotech-278f8.firebaseapp.com/">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={chatbubble} className="mr-1 mt-1"></IonIcon> Chat
                            </button>
                        </Link>

                        <Link href="/financial-aid">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={wallet} className="mr-1 mt-1"></IonIcon>  Finance
                            </button>
                        </Link>
                        <Link href="/scheme">
                            <button type="button"
                                className="flex justify-center w-full px-4 py-2 font-medium  text-center rtl:text-right border-b-2 border-white cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                                <IonIcon icon={reader} className="mr-1 mt-1"></IonIcon>  Scheme
                            </button>
                        </Link>

                        <button onClick={handleToClosef} type="button"
                            className="flex justify-center w-full px-4 py-2 font-medium  text-xl text-center rtl:text-right  border-white  cursor-pointer hover:bg-green-100 rounded-sm dark:hover:bg-green-600 dark:hover:text-white ">
                            Close <IonIcon icon={closeCircle} className="ml-2 mt-1"></IonIcon>
                        </button>


                    </div>
                </dialog>
            </header>

        </section >

    );
}