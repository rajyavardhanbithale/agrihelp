import React from 'react';
import kisanimg from './assets/kisansphier.jpg'
function PromoSection() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 mb-10">
      <section className="rounded-2xl mt-10 flex max-w-[1200px] justify-between bg-emerald-900 px-5">
        <div className="py-8 px-3 lg:px-16">
          <p className="text-white">ONLINE EXCLUSIVE</p>
          <h2 className="pt-6 text-5xl font-bold text-green-100">15% OFF</h2>
          <p className="pt-4 text-white">
            ACCENT CHAIRS, <br />
            TABLES & OTTOMANS
          </p>
          <button
            href="#"
            className="mt-6 bg-teal-700 px-5 py-3  hover:bg-teal-800 text-gray-50 rounded-2xl transition ease-in-out duration-500"
          >
            Shop now
          </button>
        </div>

        <img
          className="-mr-5 hidden w-[500px] object-cover md:block rounded-2xl bg-blend-darken"
          src="https://img.freepik.com/free-vector/gradient-colorful-sale-wallpaper_52683-55788.jpg"
          alt=" credit card with macbook on a background"
        />
      </section>
    </div>
  );
}

export default PromoSection;
