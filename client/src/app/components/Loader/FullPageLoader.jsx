
export default function FullPageLoader() {
    return (
        <>


                <div class="-mt-28 flex items-center justify-center h-screen">
                    <div class="relative">
                        <div class="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                        <div class="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-green-800 animate-spin"></div>
                        <span className="absolute w-full mt-5 text-xl -ml-3">Loading&nbsp;..</span>
                    </div>
                </div>


        </>
    )
}
