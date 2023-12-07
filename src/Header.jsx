import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";

export default function Header() {
    const {user} = useContext(UserContext);
    return (
        <header className="flex justify-between">
            <Link  to={'/'} className="flex items-center gap-1">

                <span className="bold text-xl">
          step
        </span>
            </Link>
            <div className=" w-96 flex gap-2 border border-gray-300 rounded-full py-2 px-5 shadow-md shadow-gray-300 justify-between items-center">
                <div className="text-gray-400"> Search places to visit</div>
                <button className="w-10 ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
            <Link to={user?'/account':'/login'} className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 flex items-center">
             <div>
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                 </svg>
             </div>
                {!!user && (
                    <div>
                        {user.name}
                    </div> ) }
            </Link>
        </header>
    )
}
