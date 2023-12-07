import {Link} from "react-router-dom";
import AccountNav from "../AccountNav.jsx";
import PlaceImage from "../PlaceImage.jsx";
import {useEffect, useState} from "react";
import axios from "axios";


export default function PlacesPage() {
    const [places,setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        });
    }, []);

    return (
    <div>
            <AccountNav/>
                <div className="text-center">
                    <Link to={'/account/places/new'} className="inline-flex gap-1 bg-black text-white py-2 px-6 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add a new place</Link>
                </div>
            <div className="mt-4 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place.id} className="grid grid-rows-1 flex cursor-pointer gap-4 bg-gray-50 p-4 px-4 rounded-2xl  justify-around">
                        <h2 className="text-xl">{place.title}</h2>
                        <div className=" flex relative">
                            <PlaceImage className="rounded-xl object-cover" place={place} />
                        </div >
                        <div className="grow-0 shrink">
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )}

//className="flex w-32 h-32 bg-gray-300 grow shrink-0"