
export default function EndpointError() {
    return (
        <>
            <div className="-mt-36 flex flex-wrap justify-center text-red-500 text-2xl">
                <div className="grid place-content-center bg-white px-4">
                    <div className="text-center">
                        <img
                            src="/assets/error.gif"
                            alt=""
                            className="mx-auto my-auto w-96 h-72"
                        />
                        <h1 className="mt-12 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Uh-oh!
                        </h1>

                        <p className="mt-4 text-xl md:text-2xl text-gray-500">
                            Temporary Service Interruption: Internal Server Error - We&apos;ll be back
                            shortly to ensure seamless operations.
                        </p>
                        <p className="mt-4 text-xl text-gray-500">
                            OR
                        </p>
                        <p className="mt-4 text-xl text-gray-500">
                            If you have urgent matters or inquiries, please don&apos;t hesitate to reach out to us via email:
                            <div className="flex flex-col gap-2 mt-2">
                                <a href="mailto:rajyavardhan@aol.com">rajyavardhan@aol.com</a>
                                <a href="mailto:bithale01@gmail.com">bithale01@gmail.com</a>
                            </div>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )
}
