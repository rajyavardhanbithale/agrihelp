import React from 'react';

const ShopFooter = () => {
    return (
        <footer className="flex flex-wrap justify-evenly items-start  gap-y-3 z-0">
            <div className="w-full flex flex-wrap items-start justify-between bg-green-500 text-white font-bold px-8 py-4  gap-6">
                <div className="order-3 lg:order-none w-full lg:w-fit text-center">
                    ©2023-2024 AGRI-HELP.
                </div>
                <div className="text-xs flex gap-x-4 mx-auto lg:w-fit">
                    <p>Terms of Service</p>
                    <p>Privacy Policy</p>
                    <p>Language</p>
                </div>
                <div className="order-2 lg:order-none w-full lg:w-fit text-center">
                    <span><i className="fa-solid fa-globe"></i></span>
                    <span>English</span>
                    <span><i className="fa-sharp fa-solid fa-caret-down"></i></span>
                </div>
            </div>
        </footer>
    );
}

export default ShopFooter;
