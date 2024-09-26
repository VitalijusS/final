import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { PublicLocationsList } from "../components/locations/PublicLocationsList";
import { AdminLocationsList } from "../components/locations/AdminLocationsList copy";
import { GlobalContext } from "../context/GlobalContext";

export function LocationListing() {
    const [locations, setLocations] = useState([]);
    const { role } = useContext(GlobalContext);
    let list = null;
    if (role === 'admin') {
        list = <AdminLocationsList locations={locations} />;
    } else {
        list = <PublicLocationsList locations={locations} />;
    }
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
                {list}
            </main>
            <Footer />
        </>
    )
}