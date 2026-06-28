import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="flex items-center justify-center p-4 bg-gray-700">
            <div className="w-full max-w-md">
                <div className="flex items-center justify-center mb-6">
                    <h1 className="text-4xl font-poppins font-extrabold text-gray-800">
                        <span className="text-black">TravelingGo</span>
                        <span className="text-green-500">.</span>
                    </h1>
                </div>

                <Outlet/>

                <p className="text-center text-sm text-gray-500 mt-6">
                    © 2025 TravelingGo. All rights
                    reserved.
                </p>
            </div>
        </div>
    )
}
