import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import axios from "axios";
import SearchBar from "./SearchBar.jsx";

export default function Header() {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    axios.get("/places");
  };

  return (
    <header className="flex justify-between items-center">
      <Link to={"/"} className="flex items-center gap-1">
        <span className="bold text-xl">step</span>
      </Link>
      <SearchBar />
      <Link
        to={user ? "/account" : "/login"}
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 flex items-center"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}
