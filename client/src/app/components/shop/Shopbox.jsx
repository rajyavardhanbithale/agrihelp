import React from 'react';
import { IonIcon } from '@ionic/react';
import { cart, cash, time } from 'ionicons/icons';
function Shopbox() {
  const features = [
    {
      "name": "Free Delivery",
      "condition": "Order from ₹200",
      "icon": cart
    },
    {
      "name": "Money Returns",
      "condition": "10 Days Guarantee",
      "icon": cash
    },
    {
      "name": "24/7 Supports",
      "condition": "Consumer Support",
      "icon": time
    }
  ];


  return (
    <>
      <h2 className="mx-auto mb-5 max-w-[1200px] px-8 text-center text-3xl tracking-widest mt-16">Our Service</h2>
      <section className="container mx-auto my-8 flex flex-col justify-center gap-3 lg:flex-row">
        {features.map((item, idx) => (

          <div key={idx} className="mx-5 flex flex-row items-center justify-center border-2 rounded-2xl border-emerald-800 py-4 px-5">
            <div>
              <IonIcon
                icon={item.icon}
                className="text-2xl text-teal-700"
              />
            </div>
            <div className="ml-6 flex flex-col justify-center">
              <h3 className="text-left text-xs font-bold lg:text-xl">{item.name}</h3>
              <p className="text-light text-center text-xs lg:text-left lg:text-lg">
                {item.condition}
              </p>
            </div>
          </div>

        ))}

      </section>
    </>
  );
}

export default Shopbox;
