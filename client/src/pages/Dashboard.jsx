import { useContext, useEffect, useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { PublicLocationsList } from "../components/locations/PublicLocationsList";

export function Dashboard() {
    const { isLoggedIn, role, likedLocations } = useContext(GlobalContext)
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
            {
                isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="">
                                    <h1>Dashboard</h1>
                                    {role === 'admin' && <Link to='/locations/new'> Add</Link>}
                                </div>
                                <p>page for loged in users</p>
                                {
                                    role === 'user' && <PublicLocationsList locations={locations.filter(obj => likedLocations.includes(obj.id))} />
                                }
                            </div>

                        </div>
                    </section>
                </main>
            }
            {
                !isLoggedIn &&
                <main>
                    <section className="container">
                        <div className="row">
                            <h1>401</h1>
                            <p>Need to be logged in to view this page </p>
                        </div>
                    </section>
                </main>
            }
            <Footer />
        </>
    )
}