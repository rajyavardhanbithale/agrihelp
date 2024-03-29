import Link from 'next/link';
import React from 'react';

function Categories() {
  const category = {
    "Seed": {
      "name": "Machinery",
      "image": "assets/rent/assets/machine.webp",
      "href": "/rental-service/search?category=machinery"
    },
    "fertilizer": {
      "name": "Tools",
      "image": "assets/rent/assets/tools.jpeg",
      "href": "/rental-service/search?category=tools"
    },
    "pump": {
      "name": "Equipment",
      "image": "assets/rent/assets/equip.jpeg",
      "href": "/rental-service/search?category=equipment"
    },
    

  }


  return (
    <>
      <div>
        <h2 className="mx-auto mb-8 mt-16 max-w-[1200px] px-8 text-center text-3xl tracking-widest">RENT BY CATEGORY</h2>
        <section className="mx-auto grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 lg:gap-8">
          {Object.entries(category).map(([key, item]) => (
            <Link key={key} href={item.href} className='py-5 px-5'>
              <div className="relative cursor-pointer">
                <img
                  className="rounded-xl mx-auto object-cover object-center h-[200px] w-[450px] brightness-50 duration-300 hover:brightness-90 "
                  src={item.image}
                  alt={item.name}
                />
                <p className="tracking-wider  text-xl font-weight-bold capitalize pointer-events-none absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 text-center text-white lg:text-xl">
                  {item.name}
                </p>
              </div>

            </Link>
          ))}
        </section>
      </div>
    </>
  );
}

export default Categories;
