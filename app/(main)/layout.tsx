import { LoginSidebar } from "@/components/login-sidebar";
import { Sidebar } from "@/components/sidebar";


interface MainLayoutProps{
    children: React.ReactNode;
}

const MainLayout = ({
    children
}: MainLayoutProps) => {
    return (  
        <div className="">
            <div className="grid grid-cols-12 h-screen w-screen sm:pl-24">
                <div className="col-span-2 sm:col-span-3 pt-1 pr-12 flex sm:justify-end relative">
                    <div>
                        <Sidebar />
                    </div>
                </div>
                <div className="col-span-10 sm:col-span-5 border-r-[1px] border-l-[1px] border-gray-600 h-screen overflow-scroll overflow-x-hidden no-scrollbar">
                    {children}
                </div>
                <div className="col-span-0 sm:col-span-3 p-5">
                    <LoginSidebar />
                </div>
            </div>
        </div>
    );
}
 
export default MainLayout;