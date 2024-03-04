'use client'

import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { personOutline, lockClosedOutline, happyOutline, mailOutline, logoGoogle, logoFacebook } from 'ionicons/icons';
import Link from 'next/link';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { signIn, useSession } from 'next-auth/react';

import '../App.css';
import FullPageLoader from '../components/Loader/FullPageLoader';
import { useSearchParams } from 'next/navigation';

export default function Signup() {
  const redirect = useSearchParams()
  const { data: session, status } = useSession();
  const [showErrors, setShowErrors] = useState(false);
  const secretKey = 'rar'
  const [loading, setLoading] = useState(false);
  const callbackRoutes = ['/shop/checkout', '/roadmap']


  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirm_password: ''

    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("First Name is Required"),
      lastname: Yup.string().required("Last Name is Required"),
      email: Yup.string().email("Invalid Email Address").required("Email is Required"),
      username: Yup.string().required("Username is Required"),
      password: Yup.string().required("Password is Required").min(8, "8+ Characters for Password"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match.")
        .required("Confirm Password Needed")
    }),

    onSubmit: async (values) => {
      setLoading(true)
      if (formik.isValid) {
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/signup`, values);

          if (response.status === 200) {
            Cookies.remove("next-auth.session-token")
            Cookies.remove("next-auth.csrf-token")
            Cookies.remove("next-auth.callback-url")

            const newCookie = {
              "emailTemp": values.email,
              "usernameTemp": values.username,
              "passwordTemp": values.password,


            }
            const encrypt = CryptoJS.AES.encrypt(JSON.stringify(newCookie), secretKey).toString()
            var fiveMin = new Date(new Date().getTime() + 50 * 60 * 1000)
            Cookies.set("user", encrypt, { expires: fiveMin })
            setLoading(false)
            window.location.href = '/signup/verify'
          }

        } catch (error) {
          console.error('Response data:', error.response.data.detail);
          setPostError(error.response.data.detail)
          setLoading(false)

        } finally {
          setSubmitting(false);
          setLoading(true)
        }

      }

    }


  });


  const handleSignUp = () => {
    setShowErrors(true);
  };

  const generateUsernameForGoogleLogin = (firstname, lastname) => {
    return firstname.slice(0, 4) + lastname.slice(0, 3) + Math.floor(Math.random() * 9999) + 1;
  }

  const postGoogleLogin = async (data, sessionType) => {
    setLoading(true)
    const splitName = data.user?.name.split(" ")
    const username = generateUsernameForGoogleLogin(splitName[0].toLowerCase(), splitName[1] ? splitName[1].toLowerCase() : "")
    const constructData = {
      "firstname": splitName[0].toLowerCase(),
      "lastname": splitName[1] ? splitName[1].toLowerCase() : "",
      "username": username,
      "email": data?.user?.email,
      "password": "&p455w0rd*r463",
      "confirm_password": "&p455w0rd*r463",
      "originF": "custom",
      "image": data.user?.image
    }


    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/signup`, constructData)

      if (response.status == 200) {
      }
    } catch (error) {
      const constructLogin = {
        "email": constructData?.email,
        "password": constructData?.password
      }

      const constructGetUser = {
        "email": constructData?.email,
        "password": constructData?.password,
        "validationKey": "token"
      }
      try {

        const response1 = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/login`, constructLogin)
        const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/get-user`, constructGetUser)

        if (response1.status === 200 && response2.status === 200) {
          const constructCookie = {
            "username": response2?.username,
            "email": constructData?.email,
            "password": constructData?.password,
            "validationKey": "token"
          }
          const encrypt = CryptoJS.AES.encrypt(JSON.stringify(constructCookie), secretKey).toString()
          Cookies.set("user", encrypt, { expires: 5 })
          setLoading(false)
          window.location.href = callbackRoutes.includes(redirect?.get("callback")) ? redirect?.get("callback") : "/"

        }
      } catch (error) {
        setLoading(false)
      }

    }
  }

  useEffect(() => {
    Cookies.remove("__fnotify")
  }, [])

  useEffect(() => {
    if (status === "authenticated" && session) {
      postGoogleLogin(session);
    }
  }, [status, session]);

  
  return (

    <>
      {loading ? (
        <FullPageLoader></FullPageLoader>
      ) : (
        <div className="-mt-24 overflow-hidden flex items-center justify-center h-screen flex-col leading-relaxed tracking-wide">
          <div className="w-full lg:flex">
            <div className="hidden lg:block w-1/2">
              <img
                src="/assets/login/signup.webp"
                alt=""
                className="w-full h-screen object-cover rounded-r-3xl"  /*mix-blend-color-dodge*/
              />
              {/* <div className="gradient__overlay w-full h-screen object-cover"></div> */}
            </div>
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center align-middle md:scale-105 lg:scale-100 xl:scale-105 scale-[0.74]">
              <div className="flex flex-col w-80">
                <span className="text-5xl w-full flex justify-center font-thin mt-5 band__font text-slate-900 ">AGRIHELP</span>


                <span className="text-gray-800 text-3xl font-bold md:mt-5 mt-3 flex justify-center">
                  Create Account
                </span>
                <span className="text-gray-800 text-sm font-semibold mt-4 md:mb-10 mb-5 flex justify-center">
                  Join and Unlock Opportunities
                </span>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-3 w-80">
                  <div className="flex flex-row">
                    <div className="relative">
                      <IonIcon
                        icon={happyOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                      />
                      <input
                        type="text"
                        className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                        placeholder="First Name"
                        name="firstname"
                        {...formik.getFieldProps('firstname')}
                      />
                    </div>

                    <div className="relative">
                      <div className="flex flex-row">
                        <IonIcon
                          icon={happyOutline}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                        />
                        <input
                          type="text"
                          className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                          placeholder="Last Name"
                          name="lastname"
                          {...formik.getFieldProps('lastname')}
                        />
                        <div className="relative">

                          {showErrors && (formik.touched.firstname && formik.errors.firstname || formik.touched.lastname && formik.errors.lastname) && (

                            <Tooltip content={formik.errors.firstname || formik.errors.lastname} />

                          )}
                        </div>
                      </div>

                    </div>
                  </div>


                  <div className="relative">
                    <div className="flex flex-row">
                      <IonIcon
                        icon={mailOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                      />
                      <input
                        type="text"
                        className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                        placeholder="Email"
                        name="email"
                        {...formik.getFieldProps('email')}
                      />

                      <div className="relative">
                        {showErrors && formik.touched.email && formik.errors.email && (
                          <Tooltip content={formik.errors.email} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex flex-row">

                      <IonIcon
                        icon={personOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                      />
                      <input
                        type="text"
                        className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                        placeholder="Username"
                        name="username"
                        {...formik.getFieldProps('username')}
                      />

                      <div className="relative">

                        {showErrors && formik.touched.username && formik.errors.username && (
                          <Tooltip content={formik.errors.username} />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="flex flex-row">
                      <IonIcon
                        icon={lockClosedOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                      />
                      <input
                        type="password"
                        className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                        placeholder="Password"
                        name="Password"
                        {...formik.getFieldProps('password')}

                      />


                      <div className="relative">

                        {showErrors && formik.touched.password && formik.errors.password && (
                          <Tooltip content={formik.errors.password} />
                        )}
                      </div>
                    </div>

                  </div>


                  <div className="relative">
                    <div className="flex flex-row">
                      <IonIcon
                        icon={lockClosedOutline}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800"
                      />
                      <input
                        type="password"
                        className="w-full bg-slate-800/20 hover:bg-opacity-50 focus:outline-none focus:bg-purple-300/10 pl-10 py-4 font-semibold text-gray-800 rounded-xl transition ease-in-out duration-500"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        {...formik.getFieldProps('confirm_password')}
                      />


                      <div className="relative">

                        {showErrors && formik.touched.confirm_password && formik.errors.confirm_password && (
                          <Tooltip content={formik.errors.confirm_password} />
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                <div className='flex w-full justify-center mt-5 md:hidden'>
                  {!showErrors ? <span>&nbsp;</span> : ""}
                  {showErrors && (formik.touched.confirm_password && formik.errors.confirm_password ||
                    formik.touched.password && formik.errors.password ||
                    formik.touched.username && formik.errors.username ||
                    formik.touched.firstname && formik.errors.firstname ||
                    formik.touched.lastname && formik.errors.lastname ||
                    formik.touched.email && formik.errors.email) && (
                      <div>{formik.errors.firstname || formik.errors.lastname || formik.errors.email || formik.errors.username || formik.errors.password || formik.errors.confirm_password}</div>
                    )}
                </div>

                <div className="flex flex-col items-center justify-center mt-2 md:mt-8">
                  <button type="submit" onClick={handleSignUp} className="bg-teal-800 hover:bg-teal-950  text-gray-200 text-xl px-10 py-3 rounded-full flex items-center space-x-2 font-semibold transition ease-in-out duration-500">
                    SIGN UP
                  </button>
                </div>
              </form>

              <div className="flex flex-col items-center justify-center md:mt-5 mt-2">

                <span className="text-gray-800 font-medium mt-2">
                  Already have a account?{' '}
                  <Link href="/login" className="text-teal-800 hover:text-teal-900 transition duration-500 ease-in-out">
                    Sign in
                  </Link>
                </span>
              </div>
              <div className="flex md:flex-row flex-col justify-center items-center text-base md:text-lg gap-3">
                      <span className="md:hidden block">OR</span>
                  <button onClick={() => signIn("google")} className="text-white md:mt-6 mt-0 bg-teal-800 md:px-5 px-2 py-2 rounded-xl font-semibold ">
                    <IonIcon
                      icon={logoGoogle}
                      className=" text-white align-middle mb-0.5 px-2"
                    />
                    Login With Google
                  </button>
                  <button onClick={() => signIn("facebook")} className=" text-white md:mt-6 mt-0 bg-teal-800 md:px-5 px-2 py-2 rounded-xl font-semibold ">
                    <IonIcon
                      icon={logoFacebook}
                      className=" text-white align-middle mb-0.5 px-2"
                    />
                    Login With Facebook
                  </button>

      
                </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}




function Tooltip(props) {
  return (
    <>
      <div className="absolute top-3.5 w-auto ml-7 text-sm px-3 py-1 text-gray-800 glass__tooltip hidden md:block">
        <span className="whitespace-nowrap">{props.content}</span>
      </div>

    </>

  );
}