import {useEffect, useState} from "react";
import axios from "axios";
import Image from "../Image.jsx";
import {Link} from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);


    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces([response.data[1], ...response.data, ...response.data, ...response.data]);
        });
    }, []);
    return (
        <div className="mt-8 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map( place => (
                    <Link to={'/place/' + place.id} className="rounded-xl p-2">
                        <div className="">
                            {place.photos?.[0] && (
                                <Image className="rounded-xl" src={place.photos[0]} alt={''}/>
                            )}
                        </div>
                        <h2 className="text-xs font-bold underline py-1 leading-4">{place.address}</h2>
                        <h2 className="leading-4">{place.title}</h2>
                    </Link>
                ))}
        </div>
    );

}
