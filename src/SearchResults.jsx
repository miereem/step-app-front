// SearchResultsPage.jsx
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Image from "./Image";
export default function SearchResults({places}) {
  return (
    <div className="mt-8 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-2 pb-6 border-b">
      {places.length > 0 &&
        places.map((place) => (
          <Link to={"/place/" + place.id} className="rounded-xl p-2" key={place.id}>
            <div className="">
              {place.photos?.[0] && <Image className="rounded-xl" src={place.photos[0]} alt={''} />}
            </div>
            <h2 className="text-xs font-bold underline py-1 leading-4">{place.address}</h2>
            <h2 className="leading-4">{place.title}</h2>
          </Link> 
        ))}
        
    </div>
  );
}
