
import "./App.css"
import FullPageLoader from "./components/Loader/FullPageLoader";

export default  function Home() {

  function randomImage() {
    const images = ["https://momento360.com/e/u/3a984be4f4e54d0ca25905ef986a5e9e?utm_campaign=embed&utm_source=other&heading=-163.78&pitch=13.3&field-of-view=75&size=medium&display-plan=true",
      "https://momento360.com/e/u/0362dcf2916a418c90e2b45dec6a4cd3?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
      "https://momento360.com/e/u/2790c82f79b64648a703c06fa2bf1c04?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true",
      "https://momento360.com/e/u/536adc6145ad4ab6b168b43aa9cb2dc3?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium&display-plan=true"]

    const random = Math.floor(Math.random() * images.length);
    return images[random];
  }
 

  return (
    <>
      <div className="overflow-hidden -mt-16 flex flex-col items-center justify-center h-screen w-full sm:text-x-xm md:text-5xl">

        <div className="-mt-10 fixed top-[40%] main-logo-page text-center z-40 font-bold text-white lg:text-5xl transform -translate-y-1/2">
          <img className="h-36 md:h-56 md:full mx-auto p-5 bg-gray-700/60 rounded-2xl" src="/assets/nav_white.png" alt="" />
        </div>

        <div className="-mt-10 fixed top-[65%] md:top-[60%]  text-center z-40 font-bold text-white lg:text-5xl transform -translate-y-1/2">
          <div className="mt-10">
            <h2 className="drop-shadow-[0_10px_5px_#1e1e1e] md:text-5xl text-2xl px-5">Revolutionizing Farming With Innovative Technology Solutions</h2>
            <h2 className="drop-shadow-[0_10px_5px_#1e1e1e] md:text-5xl text-2xl px-5">A Helping Hand For Farmers</h2>
          </div>
        </div>

        <iframe id="your-iframe-id" src={randomImage()} className="h-full z-0 w-full"></iframe>

      </div>

      {/* <FullPageLoader></FullPageLoader> */}
     
    </>

  )
}
