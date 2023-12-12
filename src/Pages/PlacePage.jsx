import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../Image";

export default function PlacePage() {
    const [currIndex, setCurrIndex] = useState(0);
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.get("/places/" + id).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return "";
  }


  const prevPhoto = () => {
    const isFirstPhoto = currIndex === 0;
    const newIndex = isFirstPhoto ? place.photos.length - 1:currIndex-1;
    setCurrIndex(newIndex);
  };

  const nextPhoto = () => {
    const isLastPhoto = currIndex === place.photos.length - 1;
    const newIndex = isLastPhoto ? 0:currIndex+1;
    setCurrIndex(newIndex);
  };

  return (
    <div className="mt-8 grid grid-cols-2 p-4 border gap-8 rounded-3xl shadow-md shadow-gray-300 ">
      <div className="flex relative group">
    
        <Image className="h-90 rounded-3xl" src={place.photos[currIndex]}></Image>

        <div className="absolute top-[50%] text-red rounded-full p-1  left-2 pt-2">
          <button className=" bg-gray-500 group-hover:block hidden bg-opacity-20" onClick={prevPhoto}>
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="absolute top-[50%] text-black rounded-full p-1 bg-opacity-20 right-2 pt-2">
          <button className="bg-gray-500 group-hover:block hidden bg-opacity-20" onClick={nextPhoto}>
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
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="grid grid-rows-5 gap-1">
        <h1>{place.owner}</h1>
        <h1>{place.title}</h1>
        <h2>{place.address}</h2>
        <button
          className="bg-transparent text-black"
        >
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
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
        <button
          className="bg-transparent text-black"
        >
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
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
