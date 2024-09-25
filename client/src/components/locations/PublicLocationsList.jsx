import { LocationCard } from "./LocationCard";

// eslint-disable-next-line react/prop-types
export function PublicLocationsList({ locations }) {
    return (
        <div className="container px-4 py-5">
            <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                {
                    // eslint-disable-next-line react/prop-types
                    locations.map((location, index) => <LocationCard key={index} {...location} />)
                }
            </div>
        </div>
    )
}