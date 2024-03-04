'use client'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import '../../App.css'
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function AuthNotiy(props) {
    const notify = () => {

        toast.success("Hello " + props.value + "you are now logged in.", {
            style: {
                background: "#303849",
            },
            toastId: 'success1',

        });
        const cookieValue = "NotificationDone"
        const encryptedCookie = CryptoJS.AES.encrypt(cookieValue, "rar").toString()
        Cookies.set("__fnotify", encryptedCookie, { expires: 50 })
    }

    useEffect(() => {
        const getCookie = Cookies.get("__fnotify") 
        const decryptCookie = getCookie ? CryptoJS.AES.decrypt(getCookie, "rar").toString(CryptoJS.enc.Utf8) : undefined 
        if (getCookie===undefined || !decryptCookie==="NotificationDone") {
            notify() 
        }
    }, [])

    // notify()

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable

                theme="dark"
                className="mt-20"
                transition={Zoom}

            />
            {/* Same as */}

        </div>
    );
}