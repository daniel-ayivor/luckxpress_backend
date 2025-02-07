import { Link } from "react-router-dom"
import { NavbarTypes } from "./Navbar"

const MobileNav = () => {
    return (
        <div className="">
            <nav style={{ zIndex: 9999999 }} className="bg-gray-800 h-screen fixed top-0 left-0 min-w-[250px] py-6 px-4 font-[sans-serif] tracking-wide overflow-auto">
                <div className="flex flex-wrap items-center gap-4 cursor-pointer">
                    <div className=" items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                    </div>

                </div>
                <div>
                    <p className="text-sm text-white">Track-Hub</p>
                    <p className="text-xs text-gray-300 mt-0.5">Track With Confidence</p>
                </div>
                <hr className="my-6 border-gray-400" />

                <ul className="space-y-12">
                    {NavbarTypes?.map((navList) => {
                        return <Link className=" space-y-12" key={navList?.id} to={navList?.link}>
                            <li className=" space-y-12">
                                <a href="javascript:void(0)" className="text-white text-sm flex items-center hover:bg-gray-700 rounded px-4 py-3 transition-all">
                                    <span className="w-[18px] h-[18px] mr-4">{navList?.icon}</span>
                                    <span>{navList?.title}</span>
                                </a>
                            </li>

                        </Link>
                    })}
                </ul>
            </nav>
        </div>
    )
}

export default MobileNav