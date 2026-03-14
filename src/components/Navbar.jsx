import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Navbar({ name, subname }) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="bg-white border-b border-[#D1D5DB] h-18 flex items-center justify-between px-4">
            <div className="flex items-center">
                <img
                    src="/Social-Media-Governance/DeloitteLogoblack.png"
                    alt="Deloitte"
                    className="w-30 h-30  cursor-pointer object-contain"
                    onClick={() => navigate('/index')}
                />

                <div className="h-5 w-px bg-gray-400 ml-1 mr-4"></div>

                <div className="leading-tight">
                    <h1 className="text-lg font-semibold text-Black">{name}</h1>
                    {subname && (
                        <p className="text-xs text-gray-500">
                            {subname}
                        </p>
                    )}
                </div>
            </div>

            {/* <div className="relative pr-5">
                <img
                    src="/user.png"
                    alt="profile"
                    className="w-8 h-8 rounded-2 cursor-pointer border"
                    onClick={() => setOpenDropdown(!openDropdown)}
                />

                {openDropdown && (
                    <div className="absolute right-0 mt-3 w-40 bg-white rounded-sm shadow-xl/30 shadow-[#6c6e6a] overflow-hidden">
                        <p className="w-full cursor-pointer text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                            Pravin
                        </p>
                        <button
                            onClick={handleLogout}
                            className="w-full cursor-pointer text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default Navbar;


