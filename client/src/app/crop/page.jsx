'use client'
import React, { useState } from 'react';
import "../App.css";
import { arrowDownCircle, arrowUpCircle, reloadOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import axios from 'axios';

import { cityArr1, stateArr1 } from './region'
import Image from 'next/image';
import ProductCard from '../components/shop/ProductCard';


export default function Crop() {

  
  const [crop, setCrop] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    Nitrogen: '',
    Phosphorus: '',
    Potassium: '',
    PHlevel: '',
    Rainfall: '',
    City: selectedCity,
  });

  const cityArr = cityArr1
  const stateArr = stateArr1

  const handleFetch = async (param) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${param}`);

      if (response.status === 200) {
        ;
        return response.data
      }
    } catch (error) {
      setError("Error in Fetching Data From Server")
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true)
    setError(null)
    e.preventDefault();

    const mandatoryFields = ['Nitrogen', 'Phosphorus', 'Potassium', 'PHlevel', 'Rainfall'];

    const missingFields = mandatoryFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
      setLoading(false)
      return;
    }

    const queryParams = `/crop/recommendation?N=${formData.Nitrogen}&P=${formData.Phosphorus}&K=${formData.Potassium}&ph=${formData.PHlevel}&rain=${formData.Rainfall}&city=${selectedCity}`;

    const response = await handleFetch(queryParams)
    setCrop(response)
    setLoading(false)
    document.getElementById("recommendation")?.scrollIntoView();
    setLoading(false)

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let selectedStateIndex = stateArr.indexOf(selectedState);
  if (selectedStateIndex === -1) {
    selectedStateIndex = 0;
  }

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    setSelectedCity('');
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  
  return (
    <>
      <div className="-mt-20">
         <div className="flex  md:h-screen">
          <img
            className="hidden lg:block w-full lg:h-full md:w-1/2 object-cover"
            src="/assets/crop/crop.webp"
            alt=""
          />
          <div className="w-full 2xl:scale-125 lg:scale-100 md:scale-125 lg:w-1/2 md:mx-5 my-3 flex flex-col justify-center ">
            <form onSubmit={handleSubmit} className="mx-auto mt-16 sm:mt-20 max-w-xl">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl md:text-4xl  mx-5 my-3 font-extrabold tracking-tight sm:text-4xl text-teal-900">
                  Crop Recommendation
                </h2>
                <p className="mt-2 text-lg leading-8 sm:text-2xl text-teal-900">
                  Fill out the below form For Crop Recommendation
                </p>
              </div>
              <br />
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 py-2 px-5">
                <div>
                  <input
                    type="text"
                    name="Nitrogen"
                    value={formData.Nitrogen}
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150  hover:scale-[1.05] duration-300"
                    placeholder="Nitrogen"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Phosphorus"
                    value={formData.Phosphorus}
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:scale-[1.05] duration-300"
                    placeholder="Phosphorus"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Potassium"
                    value={formData.Potassium}
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:scale-[1.05] duration-300"
                    placeholder="Potassium"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="PHlevel"
                    value={formData.PHlevel}
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:scale-[1.05] duration-300"
                    placeholder="PH level"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="Rainfall"
                    value={formData.Rainfall}
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:scale-[1.05] duration-300"
                    placeholder="Rain-fall(in mm)"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="City"
                    value="INDIA"
                    onChange={handleInputChange}
                    className="ring-1 rounded-full w-full px-4 py-3 ring-gray-900/10 text-black transition ease-in-out delay-150 hover:scale-[1.05] duration-300"
                    placeholder="INDIA"
                  />
                </div>

                <div className="relative inline-block text-left">
                  <label htmlFor="state" className="block text-gray-600 text-sm font-medium mb-2">

                  </label>
                  <select
                    id="state"
                    onChange={handleStateChange}
                    value={selectedState}
                    className="appearance-none ring-gray-900/10 rounded-full border w-full border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 leading-tight focus:outline-none focus:shadow-outline custom-scrollbar"
                  >
                    <option value="">Select State</option>
                    {stateArr.map((state, index) => (
                      <option key={index} value={state} className="capitalize">
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative inline-block text-left">
                  <label htmlFor="city" className="block text-gray-600 text-sm font-medium mb-2">

                  </label>
                  <select
                    id="city"
                    onChange={handleCityChange}
                    value={selectedCity}
                    className="appearance-none ring-gray-900/10 rounded-full border w-full border-gray-300 hover:border-gray-500 px-4 py-3 pr-8 leading-tight focus:outline-none focus:shadow-outline custom-scrollbar"
                  >
                    <option value="">Select City</option>
                    {cityArr[selectedStateIndex].map((city, index) => (
                      <option key={index} value={city} className="capitalize">
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="py-10 flex w-full justify-center">
                <button
                  type="submit"
                  className="ring-1 rounded-full w-1/2 px-4 py-3 ring-gray-900/10 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 bg-teal-800 text-white"

                >
                  {loading ? (
                    <span>
                      <IonIcon icon={reloadOutline} className="animate animate-spin"></IonIcon>
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
            <span className="text-red-500 animate-fade text-xl">{error}</span>
          </div>

        </div>

      {crop?.typeOfCrop && <Result crop={crop} />}
      </div>
    </>
  );
};

const CollapsibleSection = ({ title, content }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="w-full md:w-10/12 md:mx-auto bg-gray-200 px-6 py-2">
      <button
        onClick={() => setVisible(!visible)}
        className="w-full flex justify-between text-slate-900   text-left text-lg px-4 py-2 mt-2 rounded focus:outline-none"
      >
        {title}

        <IonIcon
          icon={visible ? arrowUpCircle : arrowDownCircle}
          className={`text-xl text-slate-800 duration-700 transform ${visible ? 'rotate-180' : 'rotate-360'}`}
        />


      </button>

      <div
        className={`bg-slate-300 px-3 py-2 mb-4 rounded-xl overflow-hidden transition-max-height transition-opacity ${visible ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        {content}
      </div>
    </div>
  );
};


function Result(crop) {

  return (
    <>
      <div className="lg:w-[90%] mx-auto" id="recommendation">
        <div className="flex justify-center items-center md:mb-16 mb-4 ">
          <span className="w-1/2 bg-teal-950 md:py-6 mt-10 lg:py-3 py-4 px-5 lg:px-0  text-white text-center md:text-3xl text-2xl rounded-2xl font-bold ">RESULT</span>
        </div>
        <div className="w-full lg:p-5 md:px-5 p-1 md:flex md:justify-between items-center">

          <div className="flex justify-center flex-col items-center text-left  p-5 border-solid border-gray-600 rounded-2xl lg:pr-10 text-2xl sm:w-full md:w-10/11 lg:w-2/3">

            <div className='font-bold text-teal-800 md:text-3xl text-2xl md:text-start text-center  capitalize'>
              growing &nbsp;
              <span className="md:text-4xl text-3xl text-teal-950 font-bold ">
                {crop?.crop?.typeOfCrop}
              </span>
              &nbsp;
              is a good fit for you.
            </div>
            <img className='lg:hidden py-2 md:py-5 rounded-2xl h-full  sm:w-full md:w-1/2' src={crop?.crop?.name?.images?.[0]} alt="" />
            <p className='md:text-left  mt-5 text-justify text-xl'>{crop?.crop?.name?.information?.introduction}</p>
            <ul className="marker:text-teal-700 ist-outside list-disc mt-5 text-lg ml-3">
              {crop?.crop?.name?.information?.varieties.map((variety, idx) => (
                <li key={idx}>
                  <span className="font-bold">
                    {variety.split(":")[0]} :
                  </span>
                  {variety.split(":")[1]}
                </li>

              ))}
            </ul>
          </div>

          <img className='hidden lg:block rounded-2xl h-full  sm:w-full md:w-1/3' src={crop?.crop?.name?.images?.[0]} alt="" />

        </div>
        <div className="lg:p-5 lg:flex lg:justify-between md:items-center leading-loose tracking-tight">
          <img className='rounded-2xl h-full w-3/4 md:w-1/3 mx-auto lg:mx-0' src={crop?.crop?.name?.images?.[1]} alt="" />
          <div className="flex justify-center px-9 flex-col items-center md:p-5 py-5 lg:py-0 text-2xl  lg:w-2/3">
            <div className="md:ml-8 ml-0.5`">
              <div className='w-full mt-5 text-center'>

                <span className='text-3xl md:text-4xl  font-semibold'>
                  How to Grow {crop?.crop?.typeOfCrop}
                </span>
              </div>
              <ul className="marker:text-teal-800 list-disc mt-5 text-lg">
                {crop?.crop?.name?.tutorial?.cultivationSteps.map((step, idx) => (
                  <li key={idx}>
                    {step}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        </div>
          
        <ProductCard width={80} path={"shop/product/"} title={"Seeds"} totalItem={6} category={"seeds"} />
        <div className='md:mb-48 mb-10 mt-5 w-full'>
          <span className="md:w-1/2 w-3/4 bg-teal-950 py-4 px-5 mt-10 mx-auto 
             text-white text-center md:text-2xl text-xl rounded-2xl font-bold  capitalize block">
            frequently asked questions
          </span>

          

          <div className="mt-5 md:p-0 p-4">

            <CollapsibleSection
              title={`Difficulty While Growing ${crop?.crop?.typeOfCrop}`}
              content={<p className="text-sm">{crop?.crop?.name?.difficulty?.level}</p>}
            />
            <CollapsibleSection
              title={`Challenges While Growing ${crop?.crop?.typeOfCrop}`}
              content={
                <ul className="marker:text-teal-700 ist-outside list-disc mt-5 text-lg">
                  {crop?.crop?.name?.difficulty?.challenges.map((name1, idx) => (
                    <li key={idx}>
                      <span className="font-bold">
                        {name1.split(":")[0]} :
                      </span>
                      {name1.split(":")[1]}
                    </li>

                  ))}
                </ul>
              }
            />

            <CollapsibleSection
              title={`Tips to grow ${crop?.crop?.typeOfCrop}`}
              content={
                <ul className="marker:text-teal-700 ist-outside list-disc mt-5 text-lg">
                  {crop?.crop?.name?.tips.map((name1, idx) => (
                    <li key={idx}>

                      •  {name1}

                    </li>

                  ))}
                </ul>
              }
            />

          </div>
        </div>
      </div>
    </>
  )

}