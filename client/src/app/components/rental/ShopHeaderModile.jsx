import React from 'react';
import ShopHeader from './ShopHeader';
import Link from 'next/link';

function ShopMobileMenu(props) {

  return (props.trigger) ? (
    <div className={`popup absolute left-0 right-0 z-50 h-screen w-full bg-white `}
    >
      <div className="mx-auto">
        <div className="mx-auto flex w-full justify-center gap-3 py-4">
          {/* Wishlist */}
          <a href="wishlist.html" className="flex cursor-pointer flex-col items-center justify-center">
            {/* Wishlist Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>

            <p className="text-xs">Wishlist</p>
          </a>

          {/* Cart */}
          <a href="cart.html" className="flex cursor-pointer flex-col items-center justify-center">
            {/* Cart Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              />
            </svg>

            <p className="text-xs">Cart</p>
          </a>

          {/* Account */}
          <Link href = "/Account" className="relative flex cursor-pointer flex-col items-center justify-center">
            {/* Account Icon */}
            <span className="absolute bottom-[33px] right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>

            <p className="text-xs">Account</p>
          </Link>
          <button 
            id="close"
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={()=> {props.setTrigger(false)}}
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Form */}
        <form className="my-4 mx-5 flex h-9 items-center border">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="mx-3 h-4 w-4"
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          {/* Search Input */}
          <input
            className="hidden w-11/12 outline-none md:block"
            type="search"
            placeholder="Search"
          />

          {/* Search Button */}
          <button
            type="submit"
            className="ml-auto h-full bg-amber-400 px-4 hover:bg-yellow-300"
          >
            Search
          </button>
        </form>

        {/* Mobile Menu Links */}
        <ul className="text-center font-medium">
          <li className="py-2"><a href="index.html">Home</a></li>
          <li className="py-2"><a href="catalog.html">Catalog</a></li>
          <li className="py-2"><a href="about-us.html">About Us</a></li>
          <li className="py-2"><Link href="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
  ) : "";
}

export default ShopMobileMenu;
