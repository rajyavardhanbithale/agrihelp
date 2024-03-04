'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';


export default function PopUpModalScheme(props) {
  useEffect(() => {
    if (props?.isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [props?.isOpen]);


  const item = props?.data

  console.log(item);

  return (
    <>
      <div className="flex items-center justify-center">
        {props?.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black opacity-40"
              onClick={props?.closeModal}
            ></div>

            <div className={`bg-white p-8 rounded-md z-10 transition-transform duration-300 ease-in-out transform scale-100 ${props.isOpen ? 'animate-jump-in' : 'animate-jump-out'} flex items-center justify-center`}>
              <div>
                <h2 className="text-2xl font-bold mb- text-center">
                  {item?.name}
                </h2>               
                 <h2 className="text-xl my-2 font-bold mb- text-center">
                  {item?.companyName}
                </h2>
                <p className="text-center text-sm md:text-lg md:max-w-[650px] my-2  md:text-center">
                  {item?.description}
                </p>
                <img
                  className="w-52 h-36 md:w-52 md:h-36 my-8 object-fill mx-auto shadow-xl rounded-2xl"
                  src={item?.image}
                  alt={item?.name}
                />
                <p className=" text-sm md:text-lg md:max-w-[650px] ">
                  Open Date: {item?.openDate}
                </p>
                <p className=" text-sm md:text-lg md:max-w-[650px]">
                  Close Date: {item?.closeDate}
                </p>
                <br />
                <p className="text-sm md:text-lg md:max-w-[650px]">
                  {item?.eligibility}
                </p>
                <br />
                <p className="capitalize  md:text-lg md:max-w-[650px] text-center">
                  Region: {item?.region}
                </p>

                <div className="flex flex-row w-full justify-center gap-5">
                  <button
                    onClick={props.closeModal}
                    className="mt-4 bg-teal-700 text-white px-4 py-2 rounded"
                  >
                    Close
                  </button>

                  <button
                    onClick={props.closeModal}
                    className={`mt-4 bg-teal-700 text-white px-4 py-2 rounded  ${item?.isOpen ? "bg-teal-600" : "bg-teal-950"}`}
                  >
                    {item?.isOpen ? (
                      <span>Register</span>
                    ) : (
                      <span className="line-through">Registration Closed</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

