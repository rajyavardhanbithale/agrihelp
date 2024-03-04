'use client'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function About() {
    const images = [
        '/about/webp/page1.webp',
        '/about/webp/page2.webp',
        '/about/webp/page3.webp',
        '/about/webp/page4.webp',
        '/about/webp/page5.webp',
        '/about/webp/page6.webp',
        '/about/webp/page7.webp',

    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,      // Enable autoplay
        autoplaySpeed: 3000, // Set the interval (in milliseconds)


    };
    return (

        <>

            <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
                <div class="absolute inset-0 -z-10 overflow-hidden">
                    <svg class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
                        <defs>
                            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                                <path d="M100 200V.5M.5 .5H200" fill="none" />
                            </pattern>
                        </defs>
                        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
                            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
                        </svg>
                        <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
                    </svg>
                </div>
                <div class="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
                    <div class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-1.5 lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div class="lg:pr-4 ">
                            <div class="w-[100%] md:w-[73.5%]">
                                <p class="text-5xl text-center py-2 font-bold leading-7 text-green-600">AGRIHELP</p>
                                <h1 class="mt-2 text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">Farmers Paradise</h1>
                                <p class="mt-6 text-xl  leading-8 tracking-wider md:text-justify text-center text-gray-700">Welcome to AGRIHELP, your go-to platform for agricultural solutions. Our web application combines the power of technology with ancient agricultural practices, allowing farmers and agricultural businesses to thrive today.</p>
                            </div>
                        </div>
                    </div>
                    <div class="-ml-12 -mt-12 p-12 lg:sticky lg:top-36 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
                        {/* <img class="md:w-[48rem] hidden md:block w-[120%]  max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10" src="/about/page1.png" alt="" />
                       */}
                       <img class="md:hidden block md:w-[48rem] w-[60%] mx-auto mr-10   max-w-none rounded-xl bg-gray-900 shadow-2xl ring-1 ring-gray-400/10" src="/about/webp/mobile.webp" alt="" /> 
                        <div className="hidden md:block">

                            <Slider {...settings}>
                                {images.map((image, index) => (
                                    <img key={index} src={image} alt={`Slide ${index + 1}`} className=" md:w-[48rem] hidden md:block w-[120%]  max-w-none rounded-xl bg-gray-900 shadow-2xl ring-1 ring-gray-400/10" />
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div class="lg:col-span-2 lg:col-start-1 lg:row-start-2  lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
                        <div class="lg:pr-4">
                            <h1 class="mt-2 text-3xl font-bold tracking-wide text-gray-900 sm:text-3xl  text-center md:w-[74%] w-[100%]">Services and Features</h1>
                            <div class="lg:w-[73%] text-base leading-7 text-gray-700 ">
                                <ul role="list" class="mt-8 space-y-8  text-gray-600">

                                    <li class="flex gap-x-3 ">
                                        <span><strong class="font-bold text-gray-900 tracking-wide text-xl">Uninterrupted business at your fingertips</strong>
                                            <br /><span className="text-base"> We introduce the online marketplace that is changing the way agriculture buys. Our user-friendly platform connects you directly with sellers, making the business process more efficient and profitable for farmers.</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Weather Information at Your Fingertips</strong>
                                            <br /><span className="text-base"> Weather capabilities provide farmers with real-time, regional weather data for informed decision making and improving crop management. You can plan your events with confidence with accurate forecasts based on the reality of your farm</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Crop recommendations for maximum yields</strong>
                                            <br /><span className="text-base"> Crop recommendations transform your farming using advanced analytics and insights gained through insight. Based on your farming experience, this feature provides personalized recommendations to improve crop selection and maximize profitability.</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Pest Intelligence for Resilient Crops</strong>
                                            <br /><span className="text-base"> We offer pest intelligence capabilities to provide farmers with valuable information to manage and protect crops from threats. Stay one step ahead of pests and diseases with real-time information and actionable advice.</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Increase growth with fertilizer recommendations</strong>
                                            <br /><span className="text-base"> We take the guesswork out of fertilizer application processes with our Fertilizer Recommendations feature, providing farmers with healthy nutrition recommendations. Increase yields and encourage permaculture practices through precision fertilization guidance.</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Access your farm with the Roadmap feature</strong>
                                            <br /><span className="text-base"> We introduce the Roadmap feature, a great tool designed to accurately and effectively guide farmers through their farming journey. This feature provides a comprehensive guide to ensuring successful and successful farming from planning to implementation..</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Make the most of government program integration.</strong>
                                            <br /><span className="text-base"> We put the power of government support directly at your fingertips through the government program. Stay informed and take advantage of farming programs and subsidies to improve your agricultural operations and increase overall profitability.</span></span>
                                    </li>

                                    <li class="flex gap-x-3">
                                        <span><strong class="font-bold text-gray-900 tracking-normal text-xl">Secure Your Farm&apos;s Financial Future with Financial Aid Hub
                                        </strong>
                                            <br /><span className="text-base"> We offer Financial Assistance, a comprehensive tool designed to help farmers access and manage financial support. Seamlessly respond to grants, loans and financial assistance to ensure economic stability and growth.</span></span>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
