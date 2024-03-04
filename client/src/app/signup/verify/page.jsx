'use client'
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import axios from "axios";

import { mailOutline, mailUnreadOutline, checkmarkDoneCircle } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";

import '../../App.css'
import { useSearchParams } from "next/navigation";

const expTime = 5
const secretKey = "rar";
export default function Verify() {

  const searchParams = useSearchParams()
  const search = searchParams.get('url')

  const [getCookie, setGetCookie] = useState(null);
  const [isError, setError] = useState("")

  const [verify, setVerify] = useState(false)

  useEffect(() => {
    const encryptedCookie = Cookies.get("user");
    
    if (encryptedCookie) {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedCookie,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        const cookieObj = JSON.parse(decryptedData);
        setGetCookie(cookieObj);

      } else {
        console.error("Failed to decrypt the cookie.");
      }
    } else {
      // console.log("sessoon");
      setError("Session Expired. Recreate your account. Redirecting in 5 seconds.")
    }

  }, []);



  // useEffect(() => {
  //   if (!search && getCookie?.usernameTemp !== undefined) {
  //     handleRefresh()
  //   }
  // }, [getCookie])


  const handleRefresh = async () => {
    const constructRequest = {
      "username": getCookie?.usernameTemp,
      "password": getCookie?.passwordTemp,
      "otp": 5689
    }

    // try {
    //   const response = await axios.post('http://127.0.0.1:8000/otp/verify', constructRequest)

    //   if (response.status === 200) {
    //     const setNewCookie = {
    //       "username": getCookie?.usernameTemp,
    //       "email": getCookie?.emailTemp,
    //       "password": getCookie?.passwordTemp,
    //       "validationKey": "token"

    //     }
    //     const enc = CryptoJS.AES.encrypt(JSON.stringify(setNewCookie), secretKey).toString()
    //     Cookies.set("user", enc, { expires: 5 })
    //     window.location.href = '/'
    //   }

    // } catch (error) {
    //   // console.log(error);

    // }
  }

  const handleVerify = async () => {
    if (search) {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/verify/${search}`)
        if (response.status === 200) {
          setVerify(true)
          window.location.href="/login"
        }
      } catch (error) {
        console.log("");
      }

    }

  }

  useEffect(() => {
    if (search) {
      handleVerify()
    }

  }, [search])

  return (
    <>
      {verify && verify ?  <Verified /> : <Unverified cookie={getCookie} expTime={expTime} />}
      
     
    </>
  )
}


function Unverified(props) {
  const getCookie = props?.cookie
  const expTime = props.expTime
  const obSecure = (unSafeMail) => {
    if (unSafeMail) {
      const [name, domain] = unSafeMail.split("@");
      return `${name[0]}${name[1]}${name[2]}${name[3]}${new Array(
        name.length - 4
      ).join("*")}@${domain}`;
    }
  };
  return (
    <>
      <div className=" relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-slate-300 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl text-gray-800">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-800">
                <p>
                  We have sent a <b>verification url</b> to your email{" "}
                  {obSecure(getCookie?.emailTemp)}{" "}
                </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col ">
                <div className="flex flex-col space-y-5 items-center ">
                  <IonIcon
                    icon={mailUnreadOutline}
                    className="text-gray-800 text-5xl"
                  />
                  <div className="flex w-3/4 justify-center space-y-5 text-gray-800 text-center ">
                    {`Verification url expire after ${expTime} minute`}
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-800">
                    <p>Didn&apos;t receive the mail?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}


function Verified() {

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
        <div className="relative bg-slate-800 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-2xl rounded-2xl">
          <div className="mx-auto flex w-full max-w-xl flex-col space-y-6">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-4xl text-gray-50">
                <p>Email Verification Complete</p>
              </div>
              <div className="flex flex-row text-xl font-medium py-5 text-gray-400 ">
                <p>
                  Your email address has been successfully verified

                </p>
              </div>
            </div>
            <div className="flex-col flex items-center ">
              <IonIcon
                icon={mailOutline}
                className="text-gray-50 text-7xl"
              />

            </div>
          </div>
        </div>
      </div>
    </>
  )
}