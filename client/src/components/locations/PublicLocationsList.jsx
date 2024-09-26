import { useContext } from "react";
import { LocationCard } from "./LocationCard";
import { GlobalContext } from "../../context/GlobalContext";

// eslint-disable-next-line react/prop-types
export function PublicLocationsList({ locations }) {
    const { likedLocations } = useContext(GlobalContext);
    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {
                    // eslint-disable-next-line react/prop-types
                    locations.map((location, index) => <LocationCard key={index} {...location} isLiked={likedLocations.includes(location.id)} />)
                }
            </div>
        </div>
    )
}