import { useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { LocationCard } from "../components/locations/LocationCard";

export function LocationListing() {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5020/api/locations')
            .then(res => res.json())
            .then(data => {
                if (typeof data !== 'object') {
                    throw new Error("not an object")
                } else {
                    setLocations(data.data)
                };
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Famous places</h1>
                            <p>Pick some of the locations you would like to visit</p>
                        </div>
                    </div>
                </div>
                <div className="container px-4 py-5" id="custom-cards">
                    <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                        {
                            locations.map((location, index) => <LocationCard key={index} {...location} />)
                        }
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}