import CreateProduct from "../components/Admin/CreateProduct"



export default function Main() {

    return (
        <>
            <aside id="default-sidebar" class="bg-green-500 fixed top-14 border-2  left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
 

                <div class="h-full px-3 py-4 overflow-y-auto  ">
                    <ul class="space-y-2 font-medium">
                        <li>
                            <a href="#" class="flex items-center p-2 text-xl rounded-lg text-white font-bold hover:bg-green-100 dark:hover:bg-green-700 group">
                                <span class="ms-3">list product </span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-xl rounded-lg text-white font-bold hover:bg-green-100 dark:hover:bg-green-700 group">
                                <span class="ms-3">Update product</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-xl rounded-lg text-white font-bold hover:bg-green-100 dark:hover:bg-green-700 group">
                                <span class="ms-3">Setting</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-xl rounded-lg text-white font-bold hover:bg-green-100 dark:hover:bg-green-700 group">
                                <span class="ms-3">Sign in</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center p-2 text-xl rounded-lg text-white font-bold hover:bg-green-100 dark:hover:bg-green-700 group">
                                <span class="ms-3">Sign up</span>
                            </a>
                        </li>
                        

                    </ul>
                </div>
            </aside>

            <div className="relative">
                <CreateProduct />

            </div>
        </>
    )
}