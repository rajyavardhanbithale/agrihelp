import Link from "next/link";
import EndpointError from "./components/EndpointError";

export default function NotFound() {
  return (
    <>
      {/* <EndpointError></EndpointError> */}
      <main class="md:-mt-32 -mt-56 grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <img
            src="/assets/error.gif"
            alt=""
            className="mx-auto my-auto w-96 h-72"
          />
          <p class=" font-bold text-green-600 text-5xl">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p class="mt-6 text-xl leading-7 text-gray-600">Oops! The page you&apos;re looking for seems to be lost in the lush green wilderness. Don&apos;t worry, we&apos;ll guide you back to the right path.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <Link href={"/"}>
              <div class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go back home
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
