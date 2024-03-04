import { NextResponse } from 'next/server'

import CryptoJS from 'crypto-js'
import useAuthUser from './app/hooks/useAuthUser'


export default async function Middleware(request) {
    const isLog = await useAuthUser()
    const checkCookie = () => {

        try {
            const getEncryptedCookie = request.cookies.get('user')?.value
            const parseEncryptedCookie = CryptoJS.AES.decrypt(getEncryptedCookie, "rar").toString(CryptoJS.enc.Utf8)
            const jsonDecrypt = JSON.parse(parseEncryptedCookie)

            if (jsonDecrypt && jsonDecrypt?.validationKey === "token") {
                return true
            }
        } catch {
            return false
        }
    }


    const checkEndpointStatus = async () => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/ping`, {
                signal: controller.signal,
            });

            const data = await response.json();

            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            return false;
        } finally {
            clearTimeout(timeoutId);
        }
    };




    const path = request.nextUrl.pathname
    const isPrivate = path === '/login' || path === '/signup' || path === '/signup/verify'


    const wakePath = path === '/about' === '/components' === '/error' === '/hooks' === '/offline' === '/scheme ' === '/shop' === '/weather' === '/api' === '/crop' === '/financial-aid' === '/login' === '/roadmap' === '/server-wakeup' === '/signup'
    if (!(await checkEndpointStatus()) && (request.nextUrl.pathname.startsWith('/crop') || request.nextUrl.pathname.startsWith('/shop') || wakePath || request.nextUrl.pathname.startsWith('/weather'))) {
        return NextResponse.redirect(new URL('/server-wakeup', request.nextUrl))
    }


    if (isLog && isPrivate) {
        console.log("==========login==========");
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    // if (checkCookie() && path === '/signup/verify' && !request.nextUrl.searchParams.get('url')) {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }

    if ((path === '/error' || path === '/server-wakeup') && await checkEndpointStatus()) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    if ((isPrivate || request.nextUrl.pathname.startsWith('/shop')) && !await checkEndpointStatus()) {
        return NextResponse.redirect(new URL('/error', request.nextUrl))
    }

    if (!isLog && path === '/shop/checkout') {
        return NextResponse.redirect(new URL('/login?callback=/shop/checkout', request.nextUrl))
    }




}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/login', '/server-wakeup', '/signup', '/', '/shop/checkout', '/signup/verify', '/shop/:path*', '/shop', '/error', '/about', '/components', '/error', '/hooks', '/offline', '/scheme ', '/shop', '/weather', '/api', '/crop', '/financial-aid', '/login', '/roadmap', '/signup']
}



