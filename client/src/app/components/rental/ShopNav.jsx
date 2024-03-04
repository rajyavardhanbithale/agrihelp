import { useState } from 'react';
import Link from 'next/link';

function ShopNav() {
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

  return (
    <nav className="relative bg-green-500">
      <div className="mx-auto hidden h-12 w-full max-w-[1200px] items-center md:flex">
        <button
          onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
          className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-amber-400"
        >
          <div className="flex justify-around" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-1 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            All categories
          </div>
        </button>

        <div className="mx-7 flex gap-8">
          <Link
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="/"
          >
            Home
          </Link>
          <a
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="catalog.html"
          >
            Catalog
          </a>
          <a
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="about-us.html"
          >
            About Us
          </a>

          <Link
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="/contact"
          >
            Contact Us
          </Link>
        </div>

        <div className="ml-auto flex gap-4 px-5">
          <a
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="login.html"
          >
            Login
          </a>
          <span className="text-white">&#124;</span>
          <a
            className="font-bold text-white duration-100 hover:text-yellow-400 hover:underline"
            href="sign-up.html"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}

export default ShopNav;
