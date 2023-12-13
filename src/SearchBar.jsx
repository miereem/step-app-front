import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import Image from "./Image.jsx";


import axios from "axios";
export default function SearchBar() {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState("");

  let category = "";
  function inCategory(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "bg-gray-900 rounded-full text-white";
    }
    return classes;
  }
  function searchCategory() {
    if (category === "users") {
      axios.get("/users");
    } else {
      axios.get("/places");
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("/search?query=" + query);
      setPlaces(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className=" w-96 flex border border-gray-300 rounded-full py-1 px-5 shadow-md shadow-gray-300 items-center">
        <input
          className="border-transparent focus:outline-none"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for places"
        />
        <button className="w-10 h-10" onClick={handleSearch}>
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      <div>
        <div className="mt-8 gap-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 &&
            places.map((place) => (
              <Link to={"/place/" + place.id} className="rounded-xl p-2">
                <div className="">
                  {place.photos?.[0] && (
                    <Image
                      className="rounded-xl"
                      src={place.photos[0]}
                      alt={""}
                    />
                  )}
                </div>
                <h2 className="text-xs font-bold underline py-1 leading-4">
                  {place.address}
                </h2>
                <h2 className="leading-4">{place.title}</h2>
              </Link>
            ))}
        </div>
        <br></br>
      </div>
    </div>
  );
}
