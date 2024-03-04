

export default function Footer() {
    return (
        <div className="fixed bottom-0 w-full">
            <footer className="flex flex-wrap justify-evenly align-middle items-start  gap-y-3 z-0">
                <div className="w-full flex flex-wrap items-start justify-between bg-green-500 text-white  px-8 py-4 gap-2 md:gap-6">
                    <div className="order-3 lg:order-none text-xl font-semibold   w-full lg:w-fit text-center">
                        ©2023-2024 AGRIHELP
                    </div>
                    <div className="hidden md:flex text-lg  gap-x-4 mx-auto lg:w-fit">
                        <p>Terms of Service</p>
                        <p>Privacy Policy</p>
                        <p>Language</p>
                    </div>
                    <div className="hidden md:block order-2 lg:order-none w-full lg:w-fit text-center">
                        
                        <span>English</span>
                        
                    </div>
                </div>
            </footer>
        </div>
    );
}

